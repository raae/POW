import axios from "axios"

export const Userlist = (pushKey = process.env.USERLIST_PUSH_KEY) => {
  const userlistApi = axios.create({
    baseURL: "https://push.userlist.com",
    headers: {
      Authorization: `Push ${pushKey}`,
    },
  })

  const log = (...args) => {
    console.log("Userlist:", ...args)
  }

  const upsertUserlistSubscriber = async ({
    identifier,
    email,
    signed_up_at,
    properties,
  }) => {
    const { data, status } = await userlistApi.post(`users`, {
      identifier,
      email,
      signed_up_at,
      properties,
    })

    log("Subscriber updated", identifier, data)
    log("Subscriber updated - status", status)
  }

  return {
    upsertUserlistSubscriber,
  }
}

export default Userlist()
