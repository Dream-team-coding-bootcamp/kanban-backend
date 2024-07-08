import express from 'express'
import BoardController from '../controllers/boardController.js'

const router = express.Router()

// Crear un nuevo board
router.post('/:projectId', BoardController.createBoard)

// Obtener todos los boards de un proyecto
router.get('/project/:projectId', BoardController.getBoardsByProjectId)

// Obtener un board por su ID
router.get('/:boardId', BoardController.getBoardById)

// Actualizar el título de un board
router.put('/:boardId', BoardController.updateBoardTitle)

// Eliminar un board
router.delete('/:boardId', BoardController.deleteBoard)

export default router
