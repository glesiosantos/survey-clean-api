import { HttpRequest, HttpResponse } from './http.ts'

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}
