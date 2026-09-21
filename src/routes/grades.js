import { Router } from 'express'
import { randomUUID } from 'node:crypto'
import db from '../db.js'
import { gradeSchema, gradeUpdateSchema } from '../validation.js'

const router = Router()

router.get('/grades', (req, res) => {
  const { studentName } = req.query
  const rows = studentName
    ? db.prepare('SELECT * FROM grades WHERE studentName = ?').all(studentName)
    : db.prepare('SELECT * FROM grades').all()
  res.json(rows)
})

router.get('/grades/:id', (req, res) => {
  const grade = db.prepare('SELECT * FROM grades WHERE id = ?').get(req.params.id)
  if (!grade) return res.status(404).json({ message: 'Nota não encontrada' })
  res.json(grade)
})

router.post('/grades', (req, res) => {
  const parsed = gradeSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ message: 'Dados inválidos', errors: parsed.error.flatten().fieldErrors })
  }

  const { studentName, subject, grade } = parsed.data
  const id = randomUUID()
  db.prepare('INSERT INTO grades (id, studentName, subject, grade) VALUES (?, ?, ?, ?)')
    .run(id, studentName, subject, grade)

  res.status(201).json({ id, studentName, subject, grade })
})

router.put('/grades/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM grades WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ message: 'Nota não encontrada' })

  const parsed = gradeUpdateSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ message: 'Dados inválidos', errors: parsed.error.flatten().fieldErrors })
  }

  const updated = { ...existing, ...parsed.data }
  db.prepare('UPDATE grades SET studentName = ?, subject = ?, grade = ? WHERE id = ?')
    .run(updated.studentName, updated.subject, updated.grade, req.params.id)

  res.json(updated)
})

router.delete('/grades/:id', (req, res) => {
  const result = db.prepare('DELETE FROM grades WHERE id = ?').run(req.params.id)
  if (result.changes === 0) return res.status(404).json({ message: 'Nota não encontrada' })
  res.status(204).end()
})

router.get('/students/:studentName/average', (req, res) => {
  const rows = db.prepare('SELECT grade FROM grades WHERE studentName = ?').all(req.params.studentName)
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Nenhuma nota encontrada para esse aluno' })
  }

  const average = rows.reduce((sum, row) => sum + row.grade, 0) / rows.length
  res.json({ studentName: req.params.studentName, average: Number(average.toFixed(2)) })
})

export default router
