import React from "react"
// import Header from "./Header"

class ProfileEditPage extends React.Component {
  render() {
    return (
      <form className="email-edit">
        <input type="text" required placeholder="🦄@usepow.app" />
        <button type="submit">Update</button>
      </form>
    )
  }
}

export default ProfileEditPage
