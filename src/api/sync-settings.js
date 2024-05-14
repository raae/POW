import createError from "http-errors"
import Joi from "joi"
import errorHandler from "../api-utils/error-handler"
import syncSettings from "../api-utils/sync-settings"

/*
 * Endpoint used to keep the settings like newsletter subscription
 * in sync with Userlist. Intended to be used by admin scripts.
 *
 * @todo add a secret as query/body param, to mimimize abuse?
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

  await syncSettings(userbaseUserId)

  // 3. Respond

  res.json({ status: "synced", userbaseUserId: userbaseUserId })
}
