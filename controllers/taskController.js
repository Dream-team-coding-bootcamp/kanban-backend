import tasks from '../models/tasks.js'

export const create = async (req, res) => {
  const { title, content, boardId } = req.body
  try {
    const task = await tasks.create({ title, content, boardId })
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// tasks.findByTaskId

export const findByTaskId = async (req, res) => {
  const { taskId } = req.params
  try {
    const task = await tasks.findByTaskId({ taskId })
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// tasks.updateTitle

export const updateTitle = async (req, res) => {
  const { taskId } = req.params
  const { title } = req.body
  try {
    const task = await tasks.updateTitle({ taskId, title })
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// tasks.updateContent

export const updateContent = async (req, res) => {
  const { taskId } = req.params
  const { content } = req.body
  try {
    const task = await tasks.updateContent({ taskId, content })
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// tasks.delete

export const deleteTask = async (req, res) => {
  const { taskId } = req.params
  try {
    const task = await tasks.delete({ taskId })
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
