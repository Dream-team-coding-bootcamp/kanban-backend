export const createProjectSchema = {
  type: 'object',
  properties: {
      name: { type: 'string', minLength: 1 },
      description: { type: 'string', minLength: 1 },
  },
  required: ['name', 'description'],
  additionalProperties: false,
};

export const updateProjectSchema = {
  type: 'object',
  properties: {
      name: { type: 'string', minLength: 1 },
      description: { type: 'string', minLength: 1 },
  },
  required: ['name', 'description'],
  additionalProperties: false,
};
