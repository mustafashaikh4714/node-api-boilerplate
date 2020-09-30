import morgan from 'morgan'

morgan.token('emotus', (_, res) => {
  if (res.statusCode < 400) {
    return '✔️ '
  }

  return '⚠️ '
})

const loggerMiddleware = () => {
  if (process.env.NODE_ENV !== 'development') {
    return (req, res, next) => next()
  }

  return morgan(
    ':emotus :method :url :status, ⌛ :response-time ms [ :date[web] ]'
  )
}

export default loggerMiddleware
