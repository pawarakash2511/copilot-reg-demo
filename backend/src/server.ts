import app from './app'

const PORT = process.env.BACKEND_PORT || 8000

app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`)
})
