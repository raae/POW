import axios from "axios"

export const Userbase = (
  accessToken = process.env.USERBASE_ADMIN_API_ACCESS_TOKEN
) => {
  const userbaseApi = axios.create({
    baseURL: "https://v1.userbase.com/v1/admin",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const log = (...args) => {
    console.log("Userbase:", ...args)
  }

  const verifyUserbaseAuthToken = async ({
    userbaseAuthToken,
    userbaseUserId,
  }) => {
    const { data: user } = await userbaseApi.get(
      "auth-tokens/" + userbaseAuthToken
    )

    log("Auth token verified", {
      userbaseUserId: data.userId,
    })

    if (user.userId !== userbaseUserId) {
      throw Error("userbaseAuthToken / userbaseUserId mismatch")
    }

    return user
  }

  const getUserbaseUser = async ({ userbaseUserId }) => {
    let { data: user } = await userbaseApi.get("users/" + userbaseUserId)

    user.stripeData = user[process.env.USERBASE_STRIPE_ENV] || {}
    user.protectedProfile = user.protectedProfile || {}
    user.profile = user.profile || {}

    log("Fetched user", { userbaseUserId: user.userId })

    return user
  }

  return {
    verifyUserbaseAuthToken,
    getUserbaseUser,
  }
}

export default Userbase()
