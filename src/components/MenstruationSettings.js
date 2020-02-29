import React, { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Grid,
  Button,
  InputAdornment,
  makeStyles,
} from "@material-ui/core"

import { tagsFromText } from "../utils/tags"

import EditIcon from "@material-ui/icons/Edit"
import AddIcon from "@material-ui/icons/Add"
import CancelIcon from "@material-ui/icons/Cancel"
import SubmitIcon from "@material-ui/icons/CheckCircle"
import { useDataState, useDataActions } from "../database"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > :last-child": {
      marginTop: theme.spacing(2),
    },
  },
  tag: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  add: {
    opacity: 0.6,
    justifyContent: "flex-start",
  },
  edit: {
    opacity: 0.6,
    marginLeft: theme.spacing(2),
  },
  form: {
    "& .MuiGrid-item:first-child": {
      flexGrow: 1,
    },
    "& .MuiInputBase-input": {
      marginBottom: theme.spacing(0.5),
    },
    "& .MuiInput-underline:after": {
      borderColor: theme.palette.grey[500],
    },
    "& > :last-child": {
      marginTop: theme.spacing(1.5),
    },
  },
  submitButton: {
    padding: "6px",
    boxShadow: theme.shadows[3],
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    "&:hover": {
      background: theme.palette.secondary.dark,
    },
  },
}))

const Tag = ({ tag, onEditTag }) => {
  const classes = useStyles()
  return (
    <div className={classes.tag}>
      {tag && <Typography className={classes.text}>#{tag}</Typography>}
      {tag ? (
        <IconButton
          onClick={onEditTag}
          className={classes.edit}
          size="small"
          aria-label="Edit tag"
        >
          <EditIcon></EditIcon>
        </IconButton>
      ) : (
        <Button
          fullWidth
          onClick={onEditTag}
          size="small"
          className={classes.add}
        >
          <AddIcon></AddIcon> Add menstruation tag
        </Button>
      )}
    </div>
  )
}

const TagForm = ({ tag = "", onTagChange, onClose }) => {
  const classes = useStyles()
  const [value, setValue] = useState(tag)

  const onSubmit = (event) => {
    event.preventDefault()
    onTagChange(value)
    onClose()
  }

  const onCancel = () => {
    onClose()
  }

  const onChange = (event) => {
    let value = event.target.value

    value = tagsFromText("#" + value)[0]

    setValue(value || "")
  }

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <TextField
            className={classes.textField}
            autoFocus={true}
            value={value}
            onChange={onChange}
            placeholder="period"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">#</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            variant="contained"
            color="default"
            aria-label="Cancel"
            onClick={onCancel}
            className={classes.cancelButton}
          >
            <CancelIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            variant="contained"
            color="default"
            type="submit"
            aria-label="Save"
            className={classes.submitButton}
          >
            <SubmitIcon />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  )
}

const MenstruationSettings = () => {
  const classes = useStyles()
  const [isEditing, setIsEditing] = useState(false)

  const { settings } = useDataState()
  const { upsertSetting } = useDataActions()

  const tag = settings.tag

  const handleTagChange = (value) => {
    upsertSetting("tag", value)
  }

  return (
    <>
      <Card>
        <CardContent className={classes.root}>
          <Typography gutterBottom variant="h6" component="h2">
            Menstruation Settings
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary">
            POW! uses the menstruation tag to align your cycles and make
            predictions for future cycles.
          </Typography>
          {!isEditing && <Tag tag={tag} onEditTag={() => setIsEditing(true)} />}

          {isEditing && (
            <TagForm
              tag={tag}
              onTagChange={handleTagChange}
              onClose={() => setIsEditing(false)}
            />
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default MenstruationSettings
