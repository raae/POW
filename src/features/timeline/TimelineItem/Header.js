import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { format, isToday, isSameDay } from "date-fns"
import { Typography } from "@material-ui/core"

import { selectIsMenstruationForDate } from "../../entries"
import {
  selectCycleDayForDate,
  selectPredictedMenstruationForDate,
} from "../../cycle"

const TimelineHeader = ({ date, selectedDate, ...props }) => {
  const cycleDay = useSelector((state) =>
    selectCycleDayForDate(state, { date })
  )

  const isLoggedMenstruation = useSelector((state) =>
    selectIsMenstruationForDate(state, { date })
  )

  const isPredictedMenstruation = useSelector((state) =>
    selectPredictedMenstruationForDate(state, { date })
  )

  const isMenstruation = isLoggedMenstruation || isPredictedMenstruation

  return (
    <header {...props}>
      <Typography
        variant="overline"
        component={isSameDay(date, selectedDate) ? "strong" : "span"}
        color="textSecondary"
      >
        {isToday(date) ? "Today" : format(date, "EEEE, MMMM do")}
      </Typography>
      <Typography
        variant="overline"
        component={isMenstruation ? "strong" : "span"}
        color={isMenstruation ? "primary" : "textSecondary"}
      >
        Day {cycleDay}
      </Typography>
    </header>
  )
}

TimelineHeader.propTypes = {
  date: PropTypes.instanceOf(Date),
}

export default TimelineHeader