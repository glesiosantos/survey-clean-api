import { SignUpController } from './signup_controller'

describe('SignUp Controller', () => {
  it('should return 400 when name is not provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      email: 'any_email@mail.com',
      password: 'any_password',
      password_confirmation: 'any_password'
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
