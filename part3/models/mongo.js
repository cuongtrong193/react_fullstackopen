const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)
.then(() => {
	console.log('connected to MongoDB')
})
.catch(error => {
	console.log('error connecting to MongoDB:', error.message)
})

const noteSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 5,
		required: true
	},
	number: {
		type: String,
		minLength: 10,
		required: true
	}
})
noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Phone', noteSchema)
