import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './routes/authRoutes.js' // Asegúrate de que la ruta al archivo user.js sea correcta

dotenv.config()

const app = express()
app.use(bodyParser.json()); // procesamiento de datos en formato JSON del body
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

console.log('TOKEN_SECRET:', process.env.TOKEN_SECRET);

app.use('/user', userRouter)

app.listen(5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`)
})
