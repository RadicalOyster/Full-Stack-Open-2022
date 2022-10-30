require('dotenv').config({ path: __dirname + '/../.env' })
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('person', function (req) { return JSON.stringify(req.body) })

//Morgan logging config
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

//error handler
const errorHandler = (error, req, res, next) => {
    if (error.name == 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }

    if (error.name == 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

//setup middleware and connect to server
const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(morganConfig)
app.use(cors())

const URI = process.env.MONGODB_URI
mongoose.connect(URI)

//Define routes
app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})

app.get('/info', (req, res) => {
    Person.find({}).then(people => {
        res.send(`<div>The phonebook has details for ${people.length} people.</div><div>${new Date()}</div>`)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            }
            else {
                res.status(404).end()
            }
        }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body

    Person.findByIdAndUpdate(req.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

//Launch server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

//Enable error handler middleware
//!Keep at bottom of file
app.use(errorHandler)