const supertest = require('supertest')
const server = require('../api/server')
const db = require('../data/dbConfig')

describe('Tests routes with user db', () => {
  test('Grab all users', async () => {
    const res = await supertest(server).get('/api/auth/users')
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body[0].username).toBe("Lorem")
  })

  test('Registers user', async () => {
    const res = await supertest(server)
    .post('/api/auth/register')
    .send({
      username: "CoolDude99",
      password: "password1"
    })
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe('application/json')
    expect(res.body.username).toBe('CoolDude99')
  })

  test('User receives login token', async () => {
    const res = await supertest(server)
      .post('/api/auth/login')
      .send({
        username: "CoolDude99",
        password: "password1"
      })

      expect(res.statusCode).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body.token).toBeDefined()
  })
})
