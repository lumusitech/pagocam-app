export class InvalidZipCodeError extends Error {
  constructor(message: string = 'Invalid zip code') {
    super(message)
    this.name = 'InvalidZipCodeError'
    Object.setPrototypeOf(this, InvalidZipCodeError.prototype)
  }
}
