import mongoose from 'mongoose'

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

const { NODE_ENV } = process.env

if (NODE_ENV === 'local' || 'development') {
  module.exports = () => {
    return mongoose.connect('mongodb://127.0.0.1:27017/test-database')
  }
} else {
  console.log('production mode')
  // connect database on remote server .
}
