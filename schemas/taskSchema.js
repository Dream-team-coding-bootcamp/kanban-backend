export const createTaskSchema = {
    type: 'object',
    properties: {
        boardId: { type: 'number' }, // Añadir el campo boardId
        title: { type: 'string', minLength: 1 },
        content: { type: 'string', minLength: 1 },
    },
    required: ['boardId', 'title', 'content'], // Incluir boardId en los campos requerboardIdos
    additionalProperties: false,
};

export const updateTitleSchema = {
    type: 'object',
    properties: {
        taskId: { type: 'number' }, // Añadir el campo taskId
        title: { type: 'string', minLength: 1 },
    },
    required: ['taskId', 'title'], // Incluir taskId en los campos requerboardIdos
    additionalProperties: false,
};

export const updateContentSchema = {
    type: 'object',
    properties: {
        boardId: { type: 'number' }, // Añadir el campo boardId
        content: { type: 'string', minLength: 1 },
    },
    required: ['boardId', 'content'], // Incluir boardId en los campos requerboardIdos
    additionalProperties: false,
};

export const changeBoardSchema = {
    type: 'object',
    properties: {
        boardId: { type: 'number' } // ID del nuevo tablero
    },
    required: ['boardId'],
    additionalProperties: false,
};

