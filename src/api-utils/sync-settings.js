import createError from "http-errors"
import userbase from "./services/userbase"
import userlist from "./services/userlist"

const syncSettings = async (userbaseUserId) => {
  try {
    // Get the Userbase User and pluck data wanted
    const userbaseUser = await userbase.getUserbaseUser({ userbaseUserId })

    const {
      userId,
      email,
      creationDate,
      profile: { newsletter },
    } = userbaseUser

    const props = {
      newsletter_at: null,
      test: null,
    }

    if (newsletter == "1") {
      // == Matches both 1 and "1"
      // Signed up before using date
      props.newsletter_at = new Date(0)
    } else if (newsletter == "0") {
      // == Matches both 0 and "0"
      props.newsletter_at = null
    } else if (newsletter) {
      // Hopefully a date
      props.newsletter_at = new Date(newsletter)
    }

    // Push data on user into Userlist
    await userlist.upsertUserlistSubscriber({
      identifier: userId,
      email: email,
      signed_up_at: creationDate,
      properties: props,
    })
    console.log("syncSettings - success", userId)
  } catch (error) {
    const { message } = error.response?.data || error.request?.data || error
    throw new createError.InternalServerError(
      "syncSettings - error: " + message
    )
  }
}

export default syncSettings
