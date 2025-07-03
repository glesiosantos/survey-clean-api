import app from '../config/app.ts'
import request from 'supertest'

describe('Content-Types Middlewares', () => {
  it('should return default Content-Types as json', async () => {
    app.get('/content-types-json', (req, res) => {
      res.send()
    })
    await request(app).get('/content-types-json').expect('content-type', /json/)
  })
})
