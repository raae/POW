import createError from "http-errors"
import Joi from "joi"
import errorHandler from "../api-utils/error-handler"
import syncSubscription from "../api-utils/sync-subscription"

/*
 * Webhook used to keep the Stripe Subscription information
 * in sync with Userlist on all subscription events.
 *
 * @todo add a secret as query param, to mimimize abuse?
 *
 */

export default async function handler(req, res) {
  console.log(`${req.baseUrl} - ${req.method}`)

  try {
    // Only handle POST requests for webhooks
    if (req.method === "POST") {
      await webhookHandler(req, res)
    } else {
      throw createError(405, `${req.method} not allowed`)
    }
  } catch (error) {
    errorHandler(req, res, error)
  }
}

const webhookHandler = async (req, res) => {
  // 1. Validate

  const bodySchema = Joi.object({
    type: Joi.string()
      .valid(
        "customer.subscription.created",
        "customer.subscription.updated",
        "customer.subscription.deleted"
      )
      .required(),
    data: Joi.object({
      object: Joi.object({
        metadata: {
          __userbase_user_id: Joi.string().required(),
        },
      }).required(),
    }).required(),
  }).options({ allowUnknown: true })

  // Deconstruct and rename user id
  const {
    data: {
      object: {
        metadata: { __userbase_user_id: userbaseUserId },
      },
    },
  } = await bodySchema.validateAsync(req.body)

  // 2. Do the thing

  await syncSubscription(userbaseUserId)

  // 3. Respond

  res.send("OK")
}
