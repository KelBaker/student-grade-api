import express from 'express'
import gradesRouter from './routes/grades.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    name: 'student-grade-manager',
    description: 'API REST para gerenciamento de notas de alunos',
    endpoints: {
      'GET /grades': 'Lista todas as notas (aceita ?studentName=)',
      'GET /grades/:id': 'Retorna uma nota específica',
      'POST /grades': 'Cria uma nova nota',
      'PUT /grades/:id': 'Atualiza uma nota existente',
      'DELETE /grades/:id': 'Remove uma nota',
      'GET /students/:studentName/average': 'Calcula a média de notas do aluno',
    },
  })
})

app.use(gradesRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Erro interno do servidor' })
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
