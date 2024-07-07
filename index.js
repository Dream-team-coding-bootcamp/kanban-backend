import express from 'express'
import dotenv from 'dotenv'
import routerBoard from './routes/routerBoard.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use('/boards', routerBoard)

app.listen(3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
