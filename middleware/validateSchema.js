import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const ajv = new Ajv()
addFormats(ajv)

const validateSchema = (schema) => (req, res, next) => {
  const validate = ajv.compile(schema)
  const valid = validate(req.body)
  if (!valid) {
    return res.status(400).json({ errors: validate.errors.map(error => error.message) })
  }
  next()
}

export default validateSchema
