import app from '../config/app.ts'
import request from 'supertest'

describe('CORS Middlewares', () => {
  it('should enable cors', async () => {
    app.post('/test_cors', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_cors')
      .send({ name: 'Glêsio Santos' })
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
