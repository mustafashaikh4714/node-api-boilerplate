import userAccount from './user/controllers/user.account'

module.exports = (app, passport) => {
  userAccount(app, passport)
}
