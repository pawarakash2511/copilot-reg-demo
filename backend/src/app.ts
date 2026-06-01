import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import submissionsRouter from './routes/submissions'

dotenv.config()

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
}))
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/submissions', submissionsRouter)

export default app
