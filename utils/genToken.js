import jwt from 'jwt-simple'
export default (user) => jwt.encode(user, process.env.JWT_SECRET.trim())
