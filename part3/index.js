require('dotenv').config()
const Note = require('./models/mongo')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))
// app.use(morgan(function (tokens, req, res) {
// 	if(tokens.method(req, res) === 'POST') {
// 		return [
// 			tokens.method(req, res),
// 			tokens.url(req, res),
// 			tokens.status(req, res),
// 			tokens.res(req, res, 'content-length'), '-',
// 			tokens['response-time'](req, res), 'ms'
// 		].join(' ')
// 	}
// }))

let notes = [
	{
		"id": "1",
		"name": "Arto Hellas",
		"number": "040-123456"
	},
	{
		"id": "2",
		"name": "Ada Lovelace",
		"number": "39-44-5323523"
	},
	{
		"id": "3",
		"name": "Dan Abramov",
		"number": "12-43-234345"
	},
	{
		"id": "4",
		"name": "Mary Poppendieck",
		"number": "39-23-6423122"
	}
]

app.get('/', (request, response) => {
	Note.find({}).then(notes => {
		response.json(notes)
	})
})
app.get('/info', (request, response) => {
	Note.find({}).then(notes => {
		response.send(`<p>Phonebook has info for ${notes.length} people</p>
	${new Date()}
	`)
	})
})

app.get('/api/persons', (request, response) => {
	Note.find({}).then(notes => {
		response.json(notes)
	})
})

app.get('/api/persons/:id', (request, response, next) => {
	// const id = request.params.id
	// const note = notes.find(note => note.id === id)
	// if (note) {
	// 	response.json(note)
	// } else {
	// 	response.status(404).end()
	// }
	Note.findById(request.params.id)
	.then(note => {
		if (note) {
			response.json(note)
		} else {
			response.status(404).end()
		}
	}).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	// const id = request.params.id
	// notes = notes.filter(note => note.id !== id)
	//
	Note.findByIdAndDelete(request.params.id)
	.then(() => {
		response.status(204).end()
	})
	.catch(error => next(error))
})

// const generateId = () => {
// 	const maxId = notes.length > 0
// 	? Math.max(...notes.map(n => Number(n.id)))
// 	: 0
// 	return String(maxId + 1)
// }

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'content missing'
		})
	}
	if(notes.find(note => note.name === body.name)) {
		return response.status(400).json({
			error: 'name must be unique'
		})
	}
	const note = new Note({
		name: body.name,
		number: body.number,
	})

	// const note = {
	// 	name: body.name,
	// 	number: body.number,
	// 	id: generateId(),
	// }

	// notes = notes.concat(note)
	note.save().then(savedNote => {
		response.json(savedNote)
	}).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
	next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
