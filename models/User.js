/* eslint-disable prefer-arrow-callback */
import mongoose, { Schema } from 'mongoose'
import getHash from '../utils/getHash'

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, doc) {
        doc.id = doc._id
        delete doc._id
        delete doc.__v
      }
    }
  }
)

UserSchema.pre('save', async function () {
  const hashPassword = await getHash(this.password)
  this.password = hashPassword
})

const User = mongoose.model('user', UserSchema)
export default User
