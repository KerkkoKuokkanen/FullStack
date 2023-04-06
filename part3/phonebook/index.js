
const http = require('http')

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())
  
//app.use(morgan('tiny'))

morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('build'))

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
  ]

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  app.get('/info', (request, response) => {
    response.send(`<div>Phonebook has info for ${persons.length} people <br />
        ${new Date()}</div>`)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.post('/api/persons', (request, response) => {
    const entry = request.body

    if (!entry.name) {
        return response.status(400).json({ 
          error: 'name missing' 
        })
      }

    if (!entry.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
      }

    if (persons.some(person => JSON.stringify(person.name) === JSON.stringify(entry.name))) {
        return response.status(400).json({ 
          error: 'name must be unique' 
        })
      }

    const person = {
        name: entry.name,
        number: entry.number,
        id: Math.random() * Number.MAX_SAFE_INTEGER
    }
    
    persons = persons.concat(person)
    response.json(person)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person)
        response.json(person)
    else
        response.status(404).end()
  })

  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})
