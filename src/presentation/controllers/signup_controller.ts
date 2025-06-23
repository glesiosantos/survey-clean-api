import { InvalidParamError } from '../errors/invalid_param_error'
import { MissingParamError } from '../errors/missing_param_error'
import { ServerError } from '../errors/server_error'
import { badRequest, serverError } from '../helpers/helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email_validator'
import { HttpRequest, HttpResponse } from '../protocols/http'

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

      return new Promise((resolve) => resolve({ statusCode: 200 }))
    } catch (error) {
      return serverError()
    }
  }
}
