import bcrypt from 'bcryptjs'
import validator from 'validator'
import User from '../../models/User'
import genToken from '../../utils/genToken'
export default (app, passport) => {
  app.get('/api/get/user', async (req, res) => {
    const user = await User.findOne({ email: 'mustafa@gmail.com' })
    return res.send(user)
  })
  app.post('/api/user/create', async (req, res) => {
    const { username, email, password } = req.body

    const doesUserAlreadyExist = await User.findOne({ email })
    if (doesUserAlreadyExist) {
      return res.status(400).send({ message: 'User already exists!' })
    }

    const user = new User({
      username,
      email,
      password
    })

    try {
      await user.save()
    } catch (error) {
      return res.status(400).send({ message: error.message })
    }
    res.send({ message: 'User created successfully.' })
  })

  app.post('/api/user/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send({ message: 'Some fields are missing!' })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).send({ message: 'Invalid email!' })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).send({ message: 'Invalid credentials!' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: 'Invalid credentials!'
      })
    }

    const data = { userId: user._id, email: user.email }
    const token = genToken(data)

    res.send({ message: 'User created successfully.', token })
  })

  // PROTECTED ROUTE.
  app.get(
    '/api/user/details',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const { email } = req.user

      const userDetails = await User.findOne({ email })
        .select(['email', 'username'])
        .lean()

      res.send({ userDetails })
    }
  )
}
