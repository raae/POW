import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { useSelector } from "react-redux"
import { Typography, ButtonBase, Paper } from "@material-ui/core"
import { Add as AddNoteIcon } from "@material-ui/icons"

import { entryIdFromDate } from "../../utils/days"
import { selectEntryNote } from "../../entries"

const Entry = ({ date, isPast, isToday, ...props }) => {
  const entryId = entryIdFromDate(date)
  const editPath = `/timeline/${entryId}/edit`
  const entryNote = useSelector((state) => selectEntryNote(state, { date }))
  const isEditable = isPast || isToday

  if (!isEditable) return null

  return (
    <Paper
      component="section"
      elevation={1}
      variant={isToday ? "elevation" : "outlined"}
    >
      <ButtonBase component={Link} to={editPath} {...props}>
        {entryNote ? (
          <Typography variant="body2">{entryNote}</Typography>
        ) : (
          <>
            <AddNoteIcon fontSize="small" />
            <Typography variant="button">Add note</Typography>
          </>
        )}
      </ButtonBase>
    </Paper>
  )
}

Entry.propTypes = {
  date: PropTypes.instanceOf(Date),
}

export default Entry
