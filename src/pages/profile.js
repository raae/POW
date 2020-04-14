import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { Box, Typography } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { Router } from "@reach/router"

import { useAuthState } from "../auth"
import { useDataState } from "../database"
import { CycleProvider } from "../cycle"

import { useQueryParam } from "../utils/useQueryParam"

import SEO from "../components/Seo"
import Loading from "../components/Loading"

import BrandLayout from "../components/BrandLayout"
import Profile from "../components/Profile"
import PaymentForm from "../components/PaymentForm"
import SettingsForm from "../components/SettingsForm"
import { Link } from "../components/Link"
import ProfileIndexPage from "../components/ProfileIndexPage"
import ProfileRouter from "../components/ProfileRouter"
import ProfileEditPage from "../components/ProfileEditPage"
const ProfilePage = () => {
  const paymentStatus = useQueryParam("payment")

  const { user, isPending: authIsPending } = useAuthState()
  const { isPending: dataIsPending, entries, settings } = useDataState()

  useEffect(() => {
    if (!user && !authIsPending) {
      navigate("/login")
    }
  }, [user, authIsPending])

  if (!user || dataIsPending) {
    return (
      <div>
        <SEO title="Loading..." />
        <Loading fullScreen />
      </div>
    )
  }

  return (
    <CycleProvider entries={entries} settings={settings}>
      <SEO title="Profile" />
      <ProfileRouter />
      <Router basepath="/profile">
        <ProfileIndexPage path="/" />
        <ProfileEditPage path="/edit" />
      </Router>
    </CycleProvider>
  )
}

export default ProfilePage
