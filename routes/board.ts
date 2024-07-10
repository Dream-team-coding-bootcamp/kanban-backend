import express from 'express'
import BoardController from '../controllers/boardController.ts'
import validateSchema from '../middleware/validateSchema.ts'
import { boardSchema1, boardSchema2 } from '../schemas/boardSchema.ts'

const router = express.Router()

// Crear un nuevo board
router.post('/:project_id', validateSchema(boardSchema1), BoardController.createBoard)

// Obtener todos los boards de un proyecto
router.get('/project/:project_id', BoardController.getBoardsByProjectId)

// Obtener un board por su ID
router.get('/:boardId', BoardController.getBoardById)

// Actualizar el título de un board
router.put('/:boardId', validateSchema(boardSchema2), BoardController.updateBoardTitle)

// Eliminar un board
router.delete('/:boardId', BoardController.deleteBoard)

export default router
