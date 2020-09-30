import mongoose from 'mongoose'

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

export const connectToDB = async () => {
  await mongoose.connect(process.env.DATABASE_URI)

  console.log('\n✔️✔️  DB')
  console.log(
    `✔️✔️  ${process.env.NODE_ENV[0].toUpperCase()}${process.env.NODE_ENV.slice(
      1
    )}`
  )
}

// ======================== *TEST* =========================== //
// if (process.env.NODE_ENV === 'local') {
//   console.log('development mode')
// } else {
//   console.log('production mode')
// }
