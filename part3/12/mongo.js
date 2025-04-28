const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://cuongmanucian19:${password}@cluster0.m96nspr.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Note = mongoose.model('phone', noteSchema)

if(process.argv[3]) {
	const note = new Note({
		name: process.argv[3],
		number: String(process.argv[4]),
	})

	note.save().then(result => {
		console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook!`)
		mongoose.connection.close()
	})
} else {
	Note
	.find({})
	.then(persons=> {
		for(let i=0;i<persons.length; i++) {
			console.log(`${persons[i].name} ${persons[i].number}`);
		}
		mongoose.connection.close()
	})
}

module.exports = mongoose.model('Phone', noteSchema)
