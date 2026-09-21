# 📊 Student Grade Manager

API REST para gerenciamento de notas de alunos — cadastro, consulta, atualização, remoção e cálculo de média por aluno.

`nodejs` `express` `sqlite` `rest-api` `zod`

## ✨ Funcionalidades

- CRUD completo de notas (`GET`, `POST`, `PUT`, `DELETE`)
- Cálculo de média de notas por aluno
- Persistência em SQLite (os dados sobrevivem a reinícios do servidor)
- Validação de payload com [Zod](https://zod.dev/) — respostas de erro claras com `400` quando os dados são inválidos
- Tratamento de rotas inexistentes (`404`) e erros internos (`500`)

## 🛠️ Tecnologias

- Node.js (ES Modules)
- Express
- better-sqlite3
- Zod

## 🚀 Como rodar localmente

```bash
git clone https://github.com/KelBaker/student_grade_manager.git
cd student_grade_manager
npm install
npm start
```

A API sobe em [http://localhost:3000](http://localhost:3000). Para desenvolvimento com reload automático:

```bash
npm run dev
```

## 📚 Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/grades` | Lista todas as notas. Aceita `?studentName=` para filtrar por aluno |
| `GET` | `/grades/:id` | Retorna uma nota específica |
| `POST` | `/grades` | Cria uma nova nota — body: `{ studentName, subject, grade }` |
| `PUT` | `/grades/:id` | Atualiza uma nota existente (parcial) |
| `DELETE` | `/grades/:id` | Remove uma nota |
| `GET` | `/students/:studentName/average` | Calcula a média das notas de um aluno |

### Exemplo — criar uma nota

```bash
curl -X POST http://localhost:3000/grades \
  -H "Content-Type: application/json" \
  -d '{"studentName": "Thiago", "subject": "English", "grade": 8}'
```

`grade` é validado entre `0` e `10`; um valor fora desse intervalo retorna `400` com a mensagem do erro.

## 🔭 Possíveis melhorias

- Autenticação para restringir quem pode cadastrar/editar notas
- Paginação em `GET /grades`
- Testes automatizados de integração

## 📄 Licença

Este projeto está sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📫 Contato

- [LinkedIn](https://www.linkedin.com/in/kelvin-h-507bb9228/)
- kelbaker56@gmail.com
