import Board from '../models/boards.js'

export default class BoardController {
  static async createBoard (req, res) {
    try {
      const { title, projectId } = req.body
      const newBoard = await Board.create({ title, projectId })
      res.status(201).json(newBoard)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async getBoardsByProjectId (req, res) {
    try {
      const { projectId } = req.params
      const boards = await Board.findByProjectId({ projectId })
      res.status(200).json(boards)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async getBoardById (req, res) {
    try {
      const { boardId } = req.params
      const board = await Board.findById({ boardId })
      if (board) {
        res.status(200).json(board)
      } else {
        res.status(404).json({ error: 'Board not found' })
      }
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async updateBoardTitle (req, res) {
    try {
      const { boardId } = req.params
      const { title } = req.body
      const updatedBoard = await Board.updateTitle({ boardId, title })
      if (updatedBoard) {
        res.status(200).json(updatedBoard)
      } else {
        res.status(404).json({ error: 'Board not found' })
      }
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async deleteBoard (req, res) {
    try {
      const { boardId } = req.params
      await Board.delete({ boardId })
      res.status(204).json()
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}
