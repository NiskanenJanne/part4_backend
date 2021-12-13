const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {username: 1, name: 1, id: 1})
    response.json(users.map(u => u.toJSON()))
  })


userRouter.post('/', async (request, response) => {
    const body = request.body
    console.log(body)
    const r = 10
    if (body.password.length > 2){
        const passwordHash = await bcrypt.hash(body.password, r)
        if (body.username.length > 2) {
            const user = new User({
                username: body.username,
                name: body.name,
                passwordHash,
            })
            const savedUser = await user.save()
            response.json(savedUser)
        }
        else {
            response.status(400).end()
        }
    }
    else {
        response.status(400).end()
    } 
})
  
module.exports = userRouter
