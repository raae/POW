export default async function handler(req, res) {
  console.log(`${req.baseUrl} - ${req.method}`)

  try {
    if (req.method === "GET") {
      res.json({
        context: process.env.CONTEXT,
        url: process.env.URL,
        deployUrl: process.env.DEPLOY_URL,
        test: process.env.TEST,
      })
    } else {
      throw createError(405, `${req.method} not allowed`)
    }
  } catch (error) {
    errorHandler(req, res, error)
  }
}
