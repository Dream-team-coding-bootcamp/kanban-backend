import express from 'express'
import dotenv from 'dotenv'
// import routerBoard from './routes/routerBoard.js'
import Board from './models/boards.js'
import tasks from './models/tasks.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use('/boards', async (req, res) => {
  const createBoard = await Board.create({ title: 'Board 1', projectId: 1 })

  const result = await Board.findByProjectId({ projectId: 1 })
  console.log(result)

  res.send('Hello World!')
})

app.use('/tasks', async (req, res) => {
  const createTask = await tasks.create({ title: 'Task 1', content: 'Content 1', boardId: 12 })
  console.log(createTask)

  res.send('Hello World!')
}
)

app.listen(3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
