import { z } from 'zod'

export const gradeSchema = z.object({
  studentName: z.string().trim().min(1, 'studentName é obrigatório'),
  subject: z.string().trim().min(1, 'subject é obrigatório'),
  grade: z.number().min(0, 'grade deve ser no mínimo 0').max(10, 'grade deve ser no máximo 10'),
})

export const gradeUpdateSchema = gradeSchema.partial()
