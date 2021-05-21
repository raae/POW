import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"
import { Router } from "@reach/router"

import { useAuth } from "../features/auth"
import { useSubscription } from "../features/user"
import { selectAreEntriesLoading } from "../features/entries"
import { useSettings } from "../features/settings"
import { TimelineIndexPage, TimelineEditPage } from "../features/timeline"

import { Seo, Loading } from "../features/app"
import { INCOMPLETE } from "../features/navigation"

const CyclePage = () => {
  const { isAuthenticated, isAuthPending } = useAuth()
  const { isSubscribed } = useSubscription()
  const { isLoading: settingsIsLoading } = useSettings()

  const entriesAreLoading = useSelector(selectAreEntriesLoading)

  const dataIsLoading = entriesAreLoading || settingsIsLoading

  useEffect(() => {
    if (isAuthenticated && !isSubscribed) {
      navigate(INCOMPLETE.to)
    }
  }, [isAuthenticated, isSubscribed])

  if (isAuthPending || dataIsLoading) {
    return (
      <>
        <Seo title="Loading..." />
        <Loading fullScreen />
      </>
    )
  }

  return (
    <>
      <Seo title="Cycle" />
      <Router basepath="/timeline">
        <TimelineIndexPage path="/" />
        <TimelineIndexPage path=":entryId" />
        <TimelineEditPage path=":entryId/edit" />
      </Router>
    </>
  )
}

export default CyclePage
