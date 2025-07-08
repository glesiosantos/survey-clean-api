export class ServerError extends Error {
  constructor(error: Error) {
    super(`Server Internal Error. ${error}`)
    this.name = 'ServerError'
  }
}
