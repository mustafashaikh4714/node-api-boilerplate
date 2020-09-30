import express from 'express'
import helmet from 'helmet'
import passport from 'passport'
import { connectToDB } from './config/database'
import errorHandler from './middlewares/error'
import loggerMiddleware from './middlewares/logger'

const app = express()

// APPLY EXPRESS MIDDLEWARES.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(passport.initialize())
app.use(errorHandler)
app.use(loggerMiddleware())

require('./routes')(app, passport)
require('./config/passport')(passport)
let port = process.env.PORT || 9000
let server
const startServer = async () => {
  await connectToDB()
  server = await app.listen(port)
  console.log(` \n 🚀 Server listening on port ${port}`)
}

startServer()

module.exports = { app, server }
