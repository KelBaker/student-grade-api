import Database from 'better-sqlite3'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const db = new Database(path.join(__dirname, '..', 'grades.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS grades (
    id TEXT PRIMARY KEY,
    studentName TEXT NOT NULL,
    subject TEXT NOT NULL,
    grade REAL NOT NULL
  )
`)

export default db
