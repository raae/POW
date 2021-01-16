import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { loadStripe } from "@stripe/stripe-js"
import classNames from "classnames"

import {
  STRIPE_KEY,
  STRIPE_MONTHLY_PLAN_ID,
  STRIPE_YEARLY_PLAN_ID,
  BASE_URL,
} from "../../constants"

import { useQueryParam } from "../utils/useQueryParam"
import {
  selectIsPayingUser,
  selectStripePlan,
  selectUserId,
  selectIsAuthenticated,
} from "../auth"

import {
  FormControl,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography,
  Button,
  Paper,
  makeStyles,
} from "@material-ui/core"

import Alert from "@material-ui/lab/Alert"

import { Link } from "../navigation"

const PLAN_LABELS = {
  [STRIPE_MONTHLY_PLAN_ID]: "monthly",
  [STRIPE_YEARLY_PLAN_ID]: "yearly",
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%", // Fix IE 11 issue.
  },
  standalone: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(4),
  },
  space: {
    marginBottom: theme.spacing(2),
  },
  alert: {
    margin: theme.spacing(2, 0),
  },
}))

const PaymentForm = ({ standalone = true, submitLabel, onDone = () => {} }) => {
  const classes = useStyles()

  const paymentStatus = useQueryParam("payment")

  const isAuthenticated = useSelector(selectIsAuthenticated)
  const userId = useSelector(selectUserId)
  const hasPaid = useSelector(selectIsPayingUser)
  const currentStripePlan = useSelector(selectStripePlan)
  const currentStripePlanLabel = PLAN_LABELS[currentStripePlan]

  console.log(PLAN_LABELS, currentStripePlan, currentStripePlanLabel)

  const [values, setValues] = useState({
    subscriptionPlan: STRIPE_YEARLY_PLAN_ID,
  })
  const [error, setError] = useState()
  const [stripe, setStripe] = useState()
  const [isPending, setIsPending] = useState()

  useEffect(() => {
    loadStripe(STRIPE_KEY).then((stripe) => {
      setStripe(stripe)
    })
  }, [])

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    onDone()
    setIsPending(true)
    stripe
      .redirectToCheckout({
        items: [{ plan: values.subscriptionPlan, quantity: 1 }],
        clientReferenceId: userId,
        successUrl: BASE_URL + "/timeline",
        cancelUrl: BASE_URL + "/profile?payment=canceled",
        // email: "rart",
      })
      .then((result) => {
        if (result.error) {
          setError(result.error)
        } else {
          setError()
        }
        setIsPending(false)
      })
      .catch((error) => {
        setError(error)
        setIsPending(false)
      })
  }

  if (hasPaid) {
    return (
      <>
        <Typography variant="body1" gutterBottom>
          You are subscribed to the <strong>{currentStripePlanLabel}</strong>{" "}
          plan.
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          If you would like to cancel your subscription or change it, send an
          e-mail to{" "}
          <Link href="mailto://support@usepow.app">support@usepow.app</Link>.
        </Typography>
      </>
    )
  } else {
    return (
      <>
        {paymentStatus === "unfinished" && (
          <Alert className={classes.space} severity="warning">
            Payment is required before starting to use POW!
          </Alert>
        )}
        {paymentStatus === "canceled" && (
          <Alert className={classes.space} severity="error">
            Payment was canceled, please try again.
          </Alert>
        )}
        <Paper
          component="form"
          className={classNames(classes.root, {
            [classes.standalone]: standalone,
          })}
          elevation={standalone ? 1 : 0}
          noValidate
          onSubmit={handleSubmit}
        >
          <Typography className={classes.space} color="textSecondary">
            Choose between a monthly or a yearly plan.
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="Subscription Plan"
              name="subscriptionPlan"
              value={values.subscriptionPlan}
              onChange={handleChange("subscriptionPlan")}
            >
              <FormControlLabel
                value={STRIPE_MONTHLY_PLAN_ID}
                control={<Radio />}
                label={
                  <Typography>
                    USD <strong>4.50</strong> per month
                  </Typography>
                }
              />
              <FormControlLabel
                value={STRIPE_YEARLY_PLAN_ID}
                control={<Radio />}
                label={
                  <>
                    <Typography component="span">
                      USD <strong>45.00</strong> per year
                    </Typography>
                    <Typography color="textSecondary" component="span">
                      {" "}
                      = 2 months free
                    </Typography>
                  </>
                }
              />
            </RadioGroup>
          </FormControl>
          <Alert className={classes.alert} severity="info">
            60 days money back guaranty.
          </Alert>
          {error && (
            <Alert className={classes.alert} severity="warning">
              {error.message}
            </Alert>
          )}
          <Button
            className={classes.space}
            disabled={!isAuthenticated || !stripe || isPending}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {submitLabel ? submitLabel : "Subscribe"}
          </Button>
        </Paper>
      </>
    )
  }
}

export default PaymentForm
