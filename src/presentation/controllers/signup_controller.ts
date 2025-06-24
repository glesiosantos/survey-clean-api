import { InvalidParamError, MissingParamError, ServerError } from '../errors'
import { badRequest, serverError } from '../helpers/helper'
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse
} from '../protocols'

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]
      for (let field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const emailValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!emailValid) {
        return badRequest(new InvalidParamError('email'))
      }

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('password'))
      }

      return new Promise((resolve) => resolve({ statusCode: 200 }))
    } catch (error) {
      return serverError()
    }
  }
}
