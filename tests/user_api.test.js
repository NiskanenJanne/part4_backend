const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

//creating test database before testing

const initialUsers = [
  {
        username: "username1",
        name: "user1",
        password: "user1"
  },
  {
        username: "username2",
        name: "user2",
        password: "user2"
  },
]
beforeEach(async () => {
  await User.deleteMany({})
  let userObject = new User(initialUsers[0])
  await userObject.save()
  userObject = new User(initialUsers[1])
  await userObject.save()
})


//tests

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a valid user can be added ', async () => {
    const newUser = {
        "username": "username3",
        "name": "user3",
        "password": "user3"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/users')
  
    const names = response.body.map(r => r.name)
  

    expect(names).toContain(
      'user3'
    )
})

test('User with short (under 3 char) username is not accepted', async () => {
    const newUser = {
        "username": "us",
        "name": "user4",
        "password": "user4"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  
    const response = await api.get('/api/users')
})

test('User with short (under 3 char) password is not accepted', async () => {
    const newUser = {
        "username": "username5",
        "name": "user5",
        "password": "u5"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  
    
})

test('Already used username cannot be added', async () => {
   
    
    const newUser = {
        "username": "username1",
        "name": "user1",
        "password": "user1"
    }
    

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(500)
    
})

afterAll(() => {
  mongoose.connection.close()
})