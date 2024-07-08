import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import authRouter from './routes/auth.js'
import boardRouter from './routes/board.js'
import projectRouter from './routes/project.js'
import taskRouter from './routes/task.js'

import auth from './middleware/auth.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)
app.use(auth)
app.use('/board', boardRouter)
app.use('/project', projectRouter)
app.use('/task', taskRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
