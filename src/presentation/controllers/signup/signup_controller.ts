import { AddAccount } from '../../../domain/usecases/account/add_account'
import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { badRequest, serverError } from '../../helpers/helper'
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse
} from './signup_protocol'

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

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

      const { name, email, password, passwordConfirmation } = httpRequest.body

      const emailValid = this.emailValidator.isValid(email)

      if (!emailValid) {
        return badRequest(new InvalidParamError('email'))
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('password'))
      }

      const account = await this.addAccount.add({ name, email, password })

      return new Promise((resolve) =>
        resolve({ statusCode: 200, body: account })
      )
    } catch (error) {
      return serverError()
    }
  }
}
