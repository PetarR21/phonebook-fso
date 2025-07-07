/* eslint-disable @stylistic/js/indent */
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return null
})

app.use(express.static('dist'))

app.use(express.json())
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens['body'](req, res),
    ].join(' ')
  })
)

app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('/info', (request, response) => {
  Person.estimatedDocumentCount()
    .then((count) => {
      response.send(
        `<div>
          <p>Phonebook has info for ${count} ${
          count === 1 ? 'person' : 'people'
        } </p>
            <p>${new Date()}</p>
            </div>`
      )
    })
    .catch((error) => {
      console.error(error)
      response.status(500).send({ error: 'Something went wrong' })
    })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.sendStatus(404)
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((deletedPerson) => {
      if (deletedPerson) {
        response.sendStatus(204)
      } else {
        response.sendStatus(404)
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // if (!body.name || !body.number) {
  //   return response.status(400).json({ error: "name or number missing" });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedObject) => {
      if (updatedObject) {
        response.json(updatedObject)
      } else {
        response.sendStatus(404)
      }
    })
    .catch((error) => next(error))
})

const unkownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unkownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
