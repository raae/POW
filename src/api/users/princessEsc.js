import fetch from "node-fetch"

GATSBY_USERLIST_PUSH_API_KEY=Pieces_Of_Eight

export default async function postPrincessEscHandler(req, res) {
  // POST data to an authenticated API
  const baseURL = "https://push.userlist.com"

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      process.env.GATSBY_USERLIST_PUSH_API_KEY
    }`,
  }

  const data = {
    name: req.body.name,
    occupation: req.body.occupation,
    age: req.body.age,
    email: email,
    identifier: identifier,
    properties: properties,
  }

  try {
    const princessEsc = await fetch(baseURL, {
      method: "POST",
      headers: headers,
      body: data,
    }).then(res => {
      return res.json()
    })

    res.json(princessEsc)
  } catch (error) {
    res.status(500).send(error)
  }
}