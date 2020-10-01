/* eslint-disable prefer-arrow-callback */
import mongoose, { Schema } from 'mongoose'
import cleanDoc from '../utils/cleanDoc'
import getHash from '../utils/getHash'

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true,
    toJSON: cleanDoc()
  }
)

UserSchema.pre('save', async function () {
  const hashPassword = await getHash(this.password)
  this.password = hashPassword
})

const User = mongoose.model('user', UserSchema)
export default User
