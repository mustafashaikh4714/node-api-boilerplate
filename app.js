import bodyParser from 'body-parser'
import express from 'express'
import passport from 'passport'

const { PORT = 9000 } = process.env
const app = express()

// APPLY EXPRESS MIDDLEWARES.
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(passport.initialize())

require('./routes')(app, passport)
require('./config/passport')(passport)

let server = null
const connection = require('./config/database')
connection()
  .then(() => {
    console.log('Connected to database')
    server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  })
  .catch((error) => console.log(error.message))

module.exports = { app, server }
