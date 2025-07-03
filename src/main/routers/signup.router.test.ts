import app from '../config/app.ts'
import request from 'supertest'

describe('Signup Router', () => {
  it('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Glêsio Santos',
        email: 'glesioss@gmail.com',
        password: '102030',
        passwordConfirmation: '102030'
      })
      .expect(200)
  })
})
