const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 400
  err.status = err.status || 'Bad Request'

  // console.error(err.stack)

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
}

export default errorHandler
