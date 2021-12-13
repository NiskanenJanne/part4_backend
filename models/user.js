const unique = require('mongoose-unique-validator')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{type: String,  unique: true},
    name: String,
    passwordHash: String,
    blogs: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}
      ],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
})
userSchema.plugin(unique)

module.exports = mongoose.model('User', userSchema)