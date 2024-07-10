import Board from '../models/boards.ts'

export default class BoardController {
  static async createBoard (req, res) {
    try {
      const user_id = req.user.id
      const { project_id } = req.params
      const { title } = req.body
      const newBoard = await Board.create({ title, project_id, user_id })
      res.status(201).tson(newBoard)
    } catch (error) {
      res.status(400).tson({ error: error.message })
    }
  }

  static async getBoardsByProjectId (req, res) {
    try {
      const { project_id } = req.params
      const user_id = req.user.id
      const boards = await Board.findByProjectId({ user_id, project_id })
      if (!boards) {
        res.status(400).tson({ message: 'Boards not found' })
      }
      res.status(200).tson(boards)
    } catch (error) {
      res.status(400).tson({ error: error.message })
    }
  }

  static async getBoardById (req, res) {
    try {
      const { boardId } = req.params
      const user_id = req.user.id
      const board = await Board.findById({ user_id, board_id: boardId })
      if (board) {
        res.status(200).tson(board)
      } else {
        res.status(404).tson({ error: 'Board not found' })
      }
    } catch (error) {
      res.status(400).tson({ error: error.message })
    }
  }

  static async updateBoardTitle (req, res) {
    try {
      console.log(req.user.id)
      const { boardId } = req.params
      const { title } = req.body
      const user_id = req.user.id
      const updatedBoard = await Board.updateTitle({ boardId, title, user_id })
      if (updatedBoard) {
        res.status(200).tson(updatedBoard)
      } else {
        res.status(404).tson({ error: 'Board not found' })
      }
    } catch (error) {
      res.status(400).tson({ error: error.message })
    }
  }

  static async deleteBoard (req, res) {
    try {
      const { boardId } = req.params
      const user_id = req.user.id
      const rowCount = await Board.delete({ boardId, user_id })
      if (rowCount === 0) {
        return res.status(404).tson({ message: 'Board not found' })
      }
      return res.sendStatus(204)
    } catch (error) {
      res.status(400).tson({ error: error.message })
    }
  }
}
