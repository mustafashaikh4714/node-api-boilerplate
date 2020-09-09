import bcrypt from 'bcryptjs'
export default (password) => bcrypt.hash(password, 10)
