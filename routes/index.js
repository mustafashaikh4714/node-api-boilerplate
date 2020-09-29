import userAccount from './user/apis/user.account'

module.exports = (app, passport) => {
  userAccount(app, passport)
}
