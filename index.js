import express from 'express'
import dotenv from 'dotenv'
import router from './routes/projects.js'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/projects', router)

app.listen(3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
