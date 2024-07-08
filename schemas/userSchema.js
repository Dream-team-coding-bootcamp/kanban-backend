export const userRegisterSchema = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 3 }
  },
  required: ['username', 'email', 'password'],
  additionalProperties: false
}

export const userLoginSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 3 }
  },
  required: ['email', 'password'],
  additionalProperties: false
}

export const userUpdateSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3 }
  },
  required: ['name'],
  additionalProperties: false
}
