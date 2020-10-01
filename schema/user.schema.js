import joi from 'joi'

export const PasswordSchema = joi.object({
  password: joi.string().min(6).max(30).required()
})

export const LoginSchema = PasswordSchema.keys({
  email: joi.string().email().required()
})
export const SignupSchema = LoginSchema.keys({
  username: joi.string().min(3).max(30).required()
})

// export default { PasswordSchema, LoginSchema, SignupSchema }
