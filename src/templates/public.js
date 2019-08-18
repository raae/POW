import React from "react"
import { Link } from "gatsby"

import useBlockstack from "./../store/useBlockstack"
import Layout from "./../components/Layout"

const PublicTemplate = ({ children }) => {
  const [{ user, isPending }, { signIn }] = useBlockstack()

  const signedOutItem = {
    label: "Sign In",
    disabled: isPending,
    variant: "outlined",
    onClick: signIn,
  }

  const signedInItem = {
    label: "Sign In",
    variant: "outlined",
    component: Link,
    to: "/app",
  }

  const homeItem = {
    label: "POW!",
    component: Link,
    to: "/",
  }

  const authItem = user ? signedInItem : signedOutItem

  const footer = (
    <>
      Made with ❤ by <a href="https://raae.codes">@raae</a>.
    </>
  )

  return (
    <Layout homeItem={homeItem} navItems={[authItem]} footer={footer}>
      {children}
    </Layout>
  )
}

export default PublicTemplate
