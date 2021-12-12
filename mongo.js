const mongoose = require('mongoose')


const url =
  `mongodb+srv://fullstack:j1a9n9n8eFS@cluster0.7qn7z.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

note.save().then(response => {
  console.log('note saved!')
  mongoose.connection.close()
})