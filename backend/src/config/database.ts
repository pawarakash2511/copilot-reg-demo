import fs from 'fs'
import path from 'path'

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../data/submissions.json')

interface DbSchema {
  submissions: Array<{
    id: number
    name: string
    email: string
    occupation: string
    created_at: string
  }>
}

function ensureDbFile(): void {
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify({ submissions: [] }, null, 2))
}

export function readDb(): DbSchema {
  ensureDbFile()
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) as DbSchema
}

export function writeDb(data: DbSchema): void {
  ensureDbFile()
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}
