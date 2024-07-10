import tasks from '../models/tasks.js'
import { Request, Response } from 'express'

export const create = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { title, content, board_id } = req.body

  try {
    const task = await tasks.create({ title, content, board_id, userId })
    if (task === undefined) res.status(401).send({ error: 'user unauthorized' })
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// tasks.findByTaskId

export const findByTaskId = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { taskId } = req.params
  try {
    const task = await tasks.findByTaskId({ taskId, userId })
    if (!task) res.status(401).send({ error: 'user unauthorized' })
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// tasks.updateTitle

export const updateTitle = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { taskId } = req.params
  const { title } = req.body

  try {
    const task = await tasks.updateTitle({ taskId, title, userId })
    if (task === undefined) res.status(401).send({ error: 'user unauthorized' })
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// tasks.updateContent

export const updateContent = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { taskId } = req.params
  const { content } = req.body
  try {
    const task = await tasks.updateContent({ taskId, content, userId })
    if (task === undefined) res.status(401).send({ error: 'user unauthorized' })
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// tasks.delete

export const deleteTask = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { taskId } = req.params
  try {
    const task = await tasks.delete({ taskId, userId })
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const changeBoard = async (req: Request, res: Response) => {
  const { taskId } = req.params
  const { board_id } = req.body
  const userId = req.user.id
  try {
    const task = await tasks.changeBoardId({ taskId, boardId: board_id, userId })
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
