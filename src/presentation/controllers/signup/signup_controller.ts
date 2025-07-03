import { AddAccount } from '../../../domain/usecases/account/add_account.ts'
import { InvalidParamError, MissingParamError } from '../../errors/index.ts'
import { badRequest, ok, serverError } from '../../helpers/helper.ts'
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse
} from './signup_protocol.ts'

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

      return ok(account)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
