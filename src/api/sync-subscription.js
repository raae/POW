import createError from "http-errors"
import Joi from "joi"
import errorHandler from "../api-utils/error-handler"
import syncSubscription from "../api-utils/sync-subscription"

/*
 * Endpoint used to keep the Stripe Subscription information
 * in sync with Userlist. Intended to be used by admin scripts.
 *
 * @todo add a secret as query param, to mimimize abuse?
 *
 */

export default async function handler(req, res) {
  console.log(`${req.baseUrl} - ${req.method}`)

  try {
    if (req.method === "POST") {
      await postHandler(req, res)
    } else {
      throw createError(405, `${req.method} not allowed`)
    }
  } catch (error) {
    errorHandler(req, res, error)
  }
}

const postHandler = async (req, res) => {
  // 1. Validate

  const bodySchema = Joi.object({
    userbaseUserId: Joi.string().required(),
  })

  // Deconstruct userbaseUserId from validated values
  const { userbaseUserId } = await bodySchema.validateAsync(req.body)

  // 2. Do the thing

  await syncSubscription(userbaseUserId)

  // 3. Respond

  res.json({ status: "synced", userbaseUserId: userbaseUserId })
}
