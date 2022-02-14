require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

const format = ":method :url :status :res[content-length] - :response-time ms :post-body"

morgan.token("post-body", function (req, res) {
    if (req.method !== "POST") return " "
    return JSON.stringify(req.body)
})

app.use(express.static('build'))
app.use(morgan(format))
app.use(cors())
app.use(express.json())

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.post('/api/persons', (req, res, next) => {
    const receivedPerson = JSON.parse(JSON.stringify(req.body)) //Copy json object to not show modificiations in logging

    if (receivedPerson.name === "") {
        res.status(403).json({
            "error": "Name cannot be empty!"
        })
        return
    }

    if (receivedPerson.number === "") {
        res.status(403).json({
            "error": "Number cannot be empty!"
        })
        return
    }

    const person = new Person({
        name: receivedPerson.name,
        number: receivedPerson.number
    })

    person.save().then(result => {
        res.json(result)
    }).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndUpdate(
        req.params.id,
        req.body
    ).then(updatedPerson => {
        res.json(updatedPerson)
    })
        .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
    Person.find({}).then(persons => {
        const nameFormat = (persons.length === 1) ? "name" : "names";
        const now = new Date();
        res.send(`<p>The phonebook has ${persons.length} ${nameFormat}.</p>` +
            `<p>${now}</p>`);
    }).catch(error => next(error))
})

const malformedIDHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(malformedIDHandler)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})