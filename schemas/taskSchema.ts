export const createTaskSchema = {
    type: 'object',
    properties: {
        board_id: { type: 'number' }, // Añadir el campo board_id
        title: { type: 'string', minLength: 1 },
        content: { type: 'string', minLength: 1 },
    },
    required: ['board_id', 'title', 'content'], // Incluir board_id en los campos requerboard_idos
    additionalProperties: false
};

export const updateTitleSchema = {
    type: 'object',
    properties: {
        title: { type: 'string', minLength: 1 }
    },
    required: ['title'], // Incluir taskId en los campos requerboard_idos
    additionalProperties: false
};

export const updateContentSchema = {
    type: 'object',
    properties: {
        content: { type: 'string', minLength: 1 },
    },
    required: ['content'], // Incluir task_id en los campos requertask_idos
    additionalProperties: false
};

export const changeBoardSchema = {
    type: 'object',
    properties: {
        board_id: { type: 'number' } // ID del nuevo tablero
    },
    required: ['board_id'],
    additionalProperties: false
};

