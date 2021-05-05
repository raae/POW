import React from "react"
import PropTypes from "prop-types"
import { TextField } from "@material-ui/core"

import { useUser } from "../useUser"

export const PasswordForm = ({ Component, title, onDone }) => {
  const { updateUser, user, isUpdating } = useUser()

  const handleSubmit = async (event) => {
    // 1. Go get that form and prevent it from naughtily self-submitting
    event.preventDefault()

    // 2. Listen for those PasSwords from those inputs
    const oldPassword = event.target.elements.currentPasswordInput.value
    const newPassword = event.target.elements.newPasswordInput.value

    // 3. Do somethings like, send those PasSwords to Daniel's and  ...'s Userbase
    const { error } = await updateUser({
      currentPassword: oldPassword,
      newPassword: newPassword,
    })

    // 4. Send that customer back to /profile or give alert if error
    if (error) {
      alert(error.message)
    } else {
      onDone()
    }
  }

  const handleReset = (event) => {
    event.preventDefault()
    onDone()
  }

  const disabled = isUpdating || !user?.userId

  return (
    <Component
      onSubmit={handleSubmit}
      onReset={handleReset}
      title={title}
      disabled={disabled}
    >
      <TextField
        disabled={disabled}
        id="currentPasswordInput"
        type="password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Current Password"
        name="Current password"
      />
      <TextField
        disabled={disabled}
        id="newPasswordInput"
        type="password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="New Password"
        name="New Password"
      />
    </Component>
  )
}

PasswordForm.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(["form"])])
    .isRequired,
  title: PropTypes.string,
  onDone: PropTypes.func,
}

PasswordForm.defaultProps = {
  Component: "form",
  onDone: () => {},
}