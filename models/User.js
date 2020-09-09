import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String }
  },
  { timestamps: true }
)

const User = mongoose.model('user', UserSchema)
export default User
