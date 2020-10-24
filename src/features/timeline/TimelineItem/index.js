import React from "react"
import PropTypes from "prop-types"
import { addDays } from "date-fns"
import { makeStyles, fade } from "@material-ui/core"

import { entryIdFromDate } from "../../utils/days"

import Info from "./Info"
import Header from "./Header"
import Entry from "./Entry"
import Predictions from "./Predictions"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    marginBottom: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
  },
  scrollTo: {
    position: "absolute",
    // Indicates how much of this entry (the day before selected)
    // should show
    bottom: "2rem",
    width: "100%",
    ...theme.mixins.toolbar,
  },
  header: {
    padding: theme.spacing(0, 1),
    display: "flex",
    justifyContent: "space-between",
    "& strong": {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  info: {
    padding: theme.spacing(0.5, 1),
    marginBottom: theme.spacing(1.5),
  },
  entry: {
    padding: theme.spacing(2),
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    "&:hover": {
      backgroundColor: fade(
        theme.palette.action.active,
        theme.palette.action.hoverOpacity
      ),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "& svg": {
      marginRight: theme.spacing(1),
    },
    "& *": {
      whiteSpace: "pre-line",
    },
  },
  predictions: {
    padding: theme.spacing(1.5),
    margin: theme.spacing(0, `${theme.shape.borderRadius / 2}px`),
    // backgroundColor: theme.palette.grey[100],
    backgroundColor: fade(
      theme.palette.secondary.main,
      theme.palette.action.hoverOpacity
    ),
    zIndex: "-1",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}))

const TimelineItem = ({ date, selectedDate, ...props }) => {
  const classes = useStyles()

  const scrollToId = `scrollTo-${entryIdFromDate(addDays(date, 1))}`
  const itemProps = { date, selectedDate }

  return (
    <article className={classes.root} {...props}>
      <div id={scrollToId} className={classes.scrollTo} />
      <Header {...itemProps} className={classes.header} />
      <Info {...itemProps} className={classes.info} />

      <Entry {...itemProps} className={classes.entry} />
      <Predictions {...itemProps} className={classes.predictions} />
    </article>
  )
}

TimelineItem.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
}

export default TimelineItem