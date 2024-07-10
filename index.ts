import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import authRouter from './routes/auth.ts'
import boardRouter from './routes/board.ts'
import projectRouter from './routes/project.ts'
import taskRouter from './routes/task.ts'

import auth from './middleware/auth.ts'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.tson())

app.use('/user', authRouter)
app.use('/board', auth, boardRouter)
app.use('/project', auth, projectRouter)
app.use('/task', auth, taskRouter)

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`)
})
