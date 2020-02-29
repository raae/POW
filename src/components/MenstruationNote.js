import React from "react"
import { Link } from "gatsby"
import { format } from "date-fns"

import { Paper, Button, Typography, makeStyles } from "@material-ui/core"
import { useSelector } from "react-redux"

import { useDataState } from "../database"

import { selectMenstruationTag } from "../store/settings"
import {
  selectNextStartDate,
  selectHumanCycleDayForToday,
} from "../store/cycle"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(2),

    "& a": {
      marginTop: theme.spacing(1),
    },
  },
}))

const NoMenstruationTagSetting = () => {
  return (
    <>
      <Typography gutterBottom>
        Let POW! know the tag you use to indicate menstruation to get
        personalized predictions.
      </Typography>
      <Button
        variant="outlined"
        color="secondary"
        to="/app/settings"
        size="small"
        component={Link}
      >
        Configure tag
      </Button>
    </>
  )
}

const NotEnoughData = () => {
  return (
    <Typography>
      There is not enough data yet to give you personalized predictions. Keep on
      tracking.
    </Typography>
  )
}

const NextNote = ({ nextStartDate, tag }) => {
  if (!nextStartDate) return null

  nextStartDate = new Date(nextStartDate)
  return (
    <Typography gutterBottom>
      Next <strong>#{tag}</strong> is coming around{" "}
      <strong>{format(nextStartDate, "eeee MMMM do")}</strong>.
    </Typography>
  )
}

const CycleDayNote = ({ cycleDay }) => {
  if (!cycleDay) return null
  return (
    <Typography gutterBottom>
      Your are on day <strong>{cycleDay}</strong> of your current cycle.
    </Typography>
  )
}

const MenstruationNote = () => {
  const classes = useStyles()
  const cycleDay = useSelector(selectHumanCycleDayForToday)
  const nextStartDate = useSelector(selectNextStartDate)
  const { cycle } = useDataState()

  let note = <NotEnoughData />
  if (cycleDay || nextStartDate) {
    note = (
      <>
        <CycleDayNote cycleDay={cycleDay}></CycleDayNote>
        <NextNote nextStartDate={nextStartDate} tag={cycle.tag}></NextNote>
      </>
    )
  } else if (cycle.tag) {
    note = <NoMenstruationTagSetting />
  }
  return (
    <Paper elevation={3} square={true} className={classes.root}>
      {note}
    </Paper>
  )
}

export default MenstruationNote
