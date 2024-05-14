import Joi from "joi"

const errorHandler = (req, res, error) => {
  // Error response present if it's an axios error
  // statusCode present if it's a custom http-error
  let status = error.response?.status || error.statusCode || 500
  const message = error.response?.data?.message || error.message

  // Check to see if it's a Joi error,
  // and make sure to expose it
  if (Joi.isError(error)) {
    status = 422
    error.expose = true
  }

  // Something went wrong, log it
  console.error(`${status} -`, message)

  // Respond with error code and message
  res.status(status).json({
    message: error.expose ? message : `Faulty ${req.baseUrl}`,
  })
}

export default errorHandler
