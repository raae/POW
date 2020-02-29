import React from "react"
import { format } from "date-fns"
import { Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(0.5),
  },
  day: {
    display: "inline-block",
    fontWeight: theme.typography.fontWeightBold,
  },
  date: {
    textTransform: "none",
  },
}))

const EntryHeader = ({ date, isToday, isMenstruation, cycleDay }) => {
  const classes = useStyles()
  return (
    <header className={classes.root}>
      {isMenstruation && (
        <Typography color="primary" variant="overline">
          ■{" "}
        </Typography>
      )}
      <Typography component="h1" className={classes.day} variant="overline">
        {isToday ? "today" : format(date, "EEEE")}
      </Typography>
      <Typography className={classes.date} variant="overline">
        {" "}
        {format(date, "LLLL do")}{" "}
      </Typography>
      <Typography className={classes.date} variant="overline">
        Day {cycleDay}
      </Typography>
    </header>
  )
}

export default EntryHeader
