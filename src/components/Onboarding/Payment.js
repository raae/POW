import React from "react"

import {
  FormControl,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography,
  Link,
} from "@material-ui/core"

const Payment = ({ values, onChange }) => {
  return (
    <>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="Subscription Plan"
          name="subscriptionPlan"
          value={values.subscriptionPlan}
          onChange={onChange("subscriptionPlan")}
        >
          <FormControlLabel
            value="monthly"
            control={<Radio />}
            label={
              <Typography>
                USD <strong>4.50</strong> per month
              </Typography>
            }
          />
          <FormControlLabel
            value="yearly"
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
      <Typography component="div" color="textSecondary">
        <p>
          If you for any reason is not happy with POW! let me know and I'll
          refund your money (within 60 days of purchase). <br />
          <cite>
            — <Link href="https://twitter.com/raae">@raae</Link>
          </cite>
        </p>
      </Typography>
    </>
  )
}

export default Payment
