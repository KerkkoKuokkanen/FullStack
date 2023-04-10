
const http = require('http')

require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./modules/person')
const { resolve } = require('path')

app.use(express.json())
app.use(cors())

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

  app.get('/info', (request, response, next) => {
    Person.countDocuments({})
    .then(count => {
      response.send(`<div>Phonebook has info for ${count} people <br />
      ${new Date()}</div>`)
    })
    .catch(error => next(error))
  })

  app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
      response.json(person)
    })
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const entry = request.body
    const id = request.params.id

    if (!entry.number) {
      return response.status(400).json({
        error: 'number missing'
      })
    }

    const person = {
      name: entry.name,
      number: entry.number,
    }

    Person.findByIdAndUpdate(id, person, {new: true}) //found this {new:true} thing from chatGPT. Ensures that the updated person is a new person and not the old one
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
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

    const person = new Person({
      name: entry.name,
      number: entry.number,
    })
    
    person.save().then(addedPerson => {
      response.json(addedPerson)
    })
  })

  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
      if (person)
        response.json(person)
      else
        response.status(404).end()
    })
    .catch(error => next(error))
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
  }

  app.use(unknownEndpoint)

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    console.log(error.name)
    if (error.name === 'CastError')
      return (response.status(400).send({error: 'malformatted id'}))
  
    next(error)
  }
  
  app.use(errorHandler)
  
  const PORT = process.env.PORT
  app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})
