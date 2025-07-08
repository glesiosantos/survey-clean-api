import { ServerError } from '../errors/index.ts'
import { HttpResponse } from '../protocols/http.ts'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: new ServerError(error)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
