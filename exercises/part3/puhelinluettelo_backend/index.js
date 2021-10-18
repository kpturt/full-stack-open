console.log('>server starting...')

const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

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

app.get('/info', (req, res) => {
    const count = persons.filter(person => person.id > 0).length
    let date = new Date()
    const info = (`<div>Phonebook has info for ${count} people.</div><div>${date}</div>`)
    res.send(info)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        res.json(person)
    } else {
        res.status(404).end() //not found
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end() //no content
})

const generateID = () => {
    const id = Math.floor(Math.random()*997+4) //returns random number from 5 to 1000
    console.log("generated id: ", id)
    return id
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log("req.body: ", body)

    if(!body.name) {
        return res.status(400).json({
            error: 'missing name'
        })
    }
    if(!body.number) {
        return res.status(400).json({
            error: 'missing number'
        })
    }
    console.log('filter name: ', persons.find(person => person.name === body.name))
    console.log('filter number: ', persons.find(person => person.number === body.number))
    if(persons.find(person => person.name === body.name)){
        console.log('name already in phonebook')
        return res.status(400).json({
            error: 'name already in phonebook'
        })
    }
    if(persons.find(person => person.number === body.number)){
        console.log('number already in phonebook')
        return res.status(400).json({
            error: 'number already in phonebook'
        })
    }
    
    const person = {
        id: generateID(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`>server running on port ${PORT}`)
})