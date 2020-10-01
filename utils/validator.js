const validate = (schema, object = undefined) => {
  let error = ''
  let values = {}
  try {
    const { error: err, value: val } = schema.validate(object)

    if (err) {
      error = err.details[0].message
    }

    values = val
  } catch (e) {
    error = e.message
  }
  return { values, error }
}

export default validate
