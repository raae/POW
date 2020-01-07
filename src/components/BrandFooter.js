import React from "react"
import { Link } from "../components/Link"

const BrandFooter = () => {
  return (
    <>
      <p>
        Made with ❤ <br /> by{" "}
        <Link target="_blank" rel="noopener" href="https://twitter.com/raae">
          @raae
        </Link>{" "}
        of{" "}
        <Link target="_blank" rel="noopener" href="https://lillylabs.no">
          Lilly Labs
        </Link>
        .
        <br />
        Follow along by signing up for the{" "}
        <Link href="https://lillylabs.ck.page/a5f42d2b44">newsletter</Link>.
      </p>
    </>
  )
}

export default BrandFooter
