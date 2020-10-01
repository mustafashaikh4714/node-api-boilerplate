import bcrypt from 'bcryptjs'
import clean from 'clean-deep'
import User from '../../models/User'
import { LoginSchema, SignupSchema } from '../../schema/user.schema'
import genToken from '../../utils/genToken'
import validate from '../../utils/validator'
export default (app, passport) => {
  app.get('/api/get/user', async (req, res) => {
    const user = await User.findOne({ email: 'mustafaa@gmail.com' })
    return res.send(user)
  })
  app.post('/api/user/create', async (req, res) => {
    const { username, email, password } = clean(req.body)

    const { values, error } = validate(SignupSchema, {
      username,
      email,
      password
    })

    if (error) {
      return res.status(400).send({ message: error })
    }

    console.log('after validation')

    const doesUserAlreadyExist = await User.findOne({ email: values.email })
    if (doesUserAlreadyExist) {
      return res.status(400).send({ message: 'User already exists!' })
    }

    const user = new User(values)

    try {
      await user.save()
    } catch (error) {
      return res.status(400).send({ message: error.message })
    }
    res.send({ message: 'User created successfully.' })
  })

  app.post('/api/user/login', async (req, res) => {
    const { email, password } = clean(req.body)

    const { values, error } = validate(LoginSchema, {
      email,
      password
    })

    if (error) {
      return res.status(400).send({ message: error })
    }

    const user = await User.findOne({ email: values.email })

    if (!user) {
      return res.status(400).send({ message: 'Invalid credentials!' })
    }

    const isMatch = await bcrypt.compare(values.password, user.password)

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: 'Invalid credentials!'
      })
    }

    const data = { userId: user._id, email: values.email }
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
