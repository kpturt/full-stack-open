console.log('>server starting...')

const express = require('express')
const app = express()

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelance",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const count = persons.filter(person => person.id > 0).length
    let date = new Date()
    const info = (`<div>Phonebook has info for ${count} people.</div><div>${date}</div>`)
    res.send(info)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`>server running on port ${PORT}`)
})