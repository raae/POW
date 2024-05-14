import StripeAPI from "stripe"

export const Stripe = (secretKey = process.env.STRIPE_SECRET_KEY) => {
  const stripeApi = StripeAPI(secretKey)

  const log = (...args) => {
    console.log("Stripe:", ...args)
  }

  const getStripeSubscription = async ({ id }) => {
    const subscription = await stripeApi.subscriptions.retrieve(id)

    log("Fetched subscription", { stripeSubscriptionId: subscription.id })

    return subscription
  }

  return {
    getStripeSubscription,
  }
}

export default Stripe()
