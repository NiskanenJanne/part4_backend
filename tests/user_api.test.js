const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

//creating test database before testing

const initialUsers = [
  {
        username: "JN97",
        name: "Janne Saari",
        password: "j9j9j8776"
  },
  {
        username: "aatu4",
        name: "Aatu Lassila",
        password: "huhhuh54"
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
        "username": "jakkoo33",
        "name": "Jaakko Mustonen",
        "password": "fvfvfv"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/users')
  
    const names = response.body.map(r => r.name)
  

    expect(names).toContain(
      'Jaakko Mustonen'
    )
})

test('User with short (under 3 char) username is not accepted', async () => {
    const newUser = {
        "username": "k1",
        "name": "Kalle Koivisto",
        "password": "fvfvfv"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  
    const response = await api.get('/api/users')
})

test('User with short (under 3 char) password is not accepted', async () => {
    const newUser = {
        "username": "kani12",
        "name": "Kalle Nieminen",
        "password": "fv"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  
    
})

test('Already used username cannot be added', async () => {
   
    
    const newUser = {
        "username": "JN97",
        "name": "Janne Saari",
        "password": "j9j9j8776"
    }
    

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(500)
    
})

afterAll(() => {
  mongoose.connection.close()
})