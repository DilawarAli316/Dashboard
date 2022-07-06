import express from 'express'
import path from 'path'
import userRoute from './routes/userRoutes.js'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'
import connectDB from './config/db.js'
import morgan from 'morgan'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// app.use(bodyParser.json({ limit: '30mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(
  cors({
    origin: '*',
  })
)

app.use(express.json())

app.use('/api/users', userRoute)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  // sending all routes except api ones to index.html file in production mode
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('The GET API IS RUNNING.....')
  })
}

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running on port ${process.env.PORT}`))
