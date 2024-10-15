import React from "react"
import { withRoot, withPage } from "./src/wrappers"

export const wrapPageElement = ({ element }) => {
  return withPage({ element })
}

export const wrapRootElement = ({ element }) => {
  return withRoot({ element, isSSR: false })
}

const HeadComponents = [
  <meta
    key="no-index-ssr-key"
    name="robots"
    content="noindex, nofollow, noimageindex, noarchive, nocache, nosnippet"
    data-no-index="true"
  />,
]
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([HeadComponents])
}
