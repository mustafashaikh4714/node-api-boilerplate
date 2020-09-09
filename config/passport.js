import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import User from '../models/User'
module.exports = (passport) => {
  let options = {}
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  options.secretOrKey = process.env.JWT_SECRET.trim()
  passport.use(
    new JwtStrategy(options, (payload, done) => {
      User.findOne({ _id: payload.userId }, (err, user) => {
        if (err) return done(err, false)
        if (user) {
          const customUser = {
            userId: user._id,
            email: user.email
          }
          return done(null, customUser)
        } else return done(null, false)
      })
    })
  )
}
