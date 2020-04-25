import React from "react"
import { useAuthActions } from "../auth"
import { navigate } from "gatsby"
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  TextField,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

// Is this CSS?
// Is this using classes in the DOM?

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "50rem",
    margin: "0 auto",
  },
  form: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    maxWidth: "35em",
  },
  helperText: {
    padding: `0 ${theme.spacing(1)}`,
  },
  appBar: {
    borderTop: `4px solid ${theme.palette.primary.main}`,
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  toolbar: {
    width: "100%",
    maxWidth: "55rem",
    margin: "0 auto",
  },
  title: {
    flexGrow: 1,
  },
}))

const ProfileEditPOWnamePage = () => {
  const classes = useStyles()
  const { updateUser } = useAuthActions()

  const createNewPOWname = (event) => {
    // Go GET that event and stop it from naughtily submitting
    event.preventDefault()
    // LISTEN for CustomerName
    const myNewPOWname = event.target.elements.POWnameInput.value
    // ESCAPE that ({username: myNewPOWname}) to DanielV's Userbase.com
    updateUser({ username: myNewPOWname })
    // EVADE back to (`/profile`) by calling the navigate from Gatsby
    navigate(`/profile`)
  }

  const createReset = (event) => {
    event.preventDefault()
    navigate(`/profile`)
  }
  return (
    <div className={classes.root}>
      <Toolbar />
      <Paper
        component="form"
        onSubmit={createNewPOWname}
        onReset={createReset}
        className={classes.form}
      >
        <label htmlFor="POWnameInput">
          <TextField
            id="POWnameInput"
            type="text"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="New POW name"
            name="POW name"
            placeholder="1554@london.uk"
            autoComplete="username"
            helperText={
              <>
                Your current POW name is <strong>Unicorny</strong>.
              </>
            }
          />
        </label>
        <AppBar
          position="absolute"
          component="div"
          color="white"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              type="reset"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              POW Name{" "}
            </Typography>

            <Button type="submit" variant="outlined" color="primary">
              Update
            </Button>
          </Toolbar>
        </AppBar>
      </Paper>
    </div>
  )
}
export default ProfileEditPOWnamePage
