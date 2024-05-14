import createError from "http-errors"
import userbase from "./services/userbase"
import userlist from "./services/userlist"
import stripe from "./services/stripe"

const timestampDate = (timestamp) => {
  return timestamp ? new Date(timestamp * 1000) : null
}

const syncSubscription = async (userbaseUserId) => {
  try {
    // Get the Userbase User and pluck data wanted
    const userbaseUser = await userbase.getUserbaseUser({ userbaseUserId })

    const {
      userId,
      email,
      username,
      creationDate,
      size,
      protectedProfile: {
        stripeCustomerId: oldStripeCustomerId,
        stripePlanId: oldStripePlanId,
      },
      stripeData: { subscriptionPlanId, subscriptionId },
    } = userbaseUser

    const props = {
      username: username,
      size: size,
      // Must use null to null stuff out in userlist,
      // undefined does not work
      subscription_id: subscriptionId || null,
      subscription_plan_id: subscriptionPlanId || null,
      subscription_status: null,
      subscription_created_at: null,
      subscription_start_date: null,
      subscription_cancel_at: null,
      subscription_canceled_at: null,
      subscription_ended_at: null,
    }

    if (subscriptionId) {
      const {
        status,
        created,
        start_date,
        cancel_at,
        canceled_at,
        ended_at,
      } = await stripe.getStripeSubscription({
        id: subscriptionId,
      })

      props.subscription_status = status
      props.subscription_created_at = timestampDate(created)
      props.subscription_start_date = timestampDate(start_date)
      props.subscription_cancel_at = timestampDate(cancel_at)
      props.subscription_canceled_at = timestampDate(canceled_at)
      props.subscription_ended_at = timestampDate(ended_at)
    } else if (oldStripeCustomerId) {
      // Older users that cancelled before migrating to Userbase's integrated payment
      props.subscription_id = null // Did not save subscription id
      props.subscription_plan_id = oldStripePlanId
      props.subscription_status = "canceled" // "canceled" is same as used by Stripe, no double "ll"
    }

    // Push data on user into Userlist
    await userlist.upsertUserlistSubscriber({
      identifier: userId,
      email: email,
      signed_up_at: creationDate,
      properties: props,
    })

    console.log("syncSubscription - success", userId)
  } catch (error) {
    const { message } = error.response?.data || error.request?.data || error
    throw new createError.InternalServerError(
      "syncSubscription - error: " + message
    )
  }
}

export default syncSubscription
