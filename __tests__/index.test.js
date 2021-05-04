const server = require('../src/server/index')
const supertest = require('supertest')
const request = supertest(server)

describe('Testing the our endpoint', () => {
  it('/test', async (done) => {
    const response = await request.get('/test')
    expect(response.status).toBe(200)
    done()
  })
})
