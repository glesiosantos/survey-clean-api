import { MongoHelper } from '../../infra/db/mongodb/helper/mongo_helper.ts'
import app from '../config/app.ts'
import request from 'supertest'

describe('Signup Router', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL))

  afterAll(async () => await MongoHelper.disconnect())

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

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
