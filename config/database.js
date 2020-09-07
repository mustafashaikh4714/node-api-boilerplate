import mongoose from 'mongoose'

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

module.exports = () => {
  return mongoose.connect(process.env.DATABASE_URI)
}

// ======================== *TEST* =========================== //
// if (process.env.NODE_ENV === 'local') {
//   console.log('development mode')
// } else {
//   console.log('production mode')
// }
