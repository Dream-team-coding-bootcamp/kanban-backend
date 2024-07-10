import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const ajv = new Ajv()
addFormats(ajv) // Añadir formatos reconocidos por AJV, como "email"

const validate = (schema) => {
  const validate = ajv.compile(schema)
  return (req, res, next) => {
    const valid = validate(req.body)
    if (!valid) {
      return res.status(400).json({ errors: validate.errors.map(error => error.message) })
    }
    next()
  }
}

export default validate
