import app from '../config/app.ts'
import request from 'supertest'

describe('Body Parser Middlewares', () => {
  it('should parser body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Glêsio Santos' })
      .expect({ name: 'Glêsio Santos' })
  })
})
