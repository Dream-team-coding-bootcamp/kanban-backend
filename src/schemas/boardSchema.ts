export const boardSchema1 = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 1 }
  },
  required: ['title'],
  additionalProperties: false
}

export const boardSchema2 = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 1 }
  },
  required: ['title'],
  additionalProperties: false
}
