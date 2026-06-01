import { readDb, writeDb } from '../config/database'
import { Submission } from '../models/submission'

export function insertSubmission(data: Omit<Submission, 'id' | 'created_at'>): Submission {
  const db = readDb()
  const id =
    db.submissions.length > 0
      ? Math.max(...db.submissions.map((s) => s.id)) + 1
      : 1
  const submission: Submission = {
    id,
    ...data,
    created_at: new Date().toISOString(),
  }
  db.submissions.push(submission)
  writeDb(db)
  return submission
}
