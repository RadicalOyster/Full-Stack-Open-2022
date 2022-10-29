const http = require('http')
const express = require('express')
const { response } = require('express')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('person', function (req, res) { return JSON.stringify(req.body)})

const morganConfig = morgan(function (tokens, req, res) {

  var content = ''

  var contentLength = (tokens.res(req, res, 'content-length'))
  if (!contentLength) {
    contentLength = '- '
  }
  else {
    content = tokens['person'](req, res)
    contentLength = contentLength.toString() + ' '
  }

  return `${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)} ${contentLength}- ${tokens['response-time'](req, res)} ms ${content}`
})

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(morganConfig)
app.use(cors())

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/api/persons', (req, res) => {
  res.send(JSON.stringify(persons))
})

app.get('/info', (req, res) => {
  res.send(`<div>The phonebook has details for ${persons.length} people.</div><div>${new Date()}</div>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  }
  else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }
  
  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }

  for (let i in persons) {
    if (persons[i].name === body.name) {
      return res.status(400).json({
        error: 'name must be unique'
      })
    }
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * (9999999999 - 5 + 1))
  }

  person["id"] = Math.floor(Math.random() * (9999999999 - 5 + 1))
  persons = persons.concat(person)

  res.json(person)
})

const PORT = process.env.PORT || 8080
console.log(process.env.PORT)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})