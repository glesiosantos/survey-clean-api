import { MissingParamError } from '../errors/missing_param_error'
import { badRequest } from '../helpers/helper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }

    return { statusCode: 0 }
  }
}
