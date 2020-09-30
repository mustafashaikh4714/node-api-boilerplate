import userAccount from './user/user.account'

module.exports = (app, passport) => {
  userAccount(app, passport)
}
