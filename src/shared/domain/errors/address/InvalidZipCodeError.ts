export class InvalidZipCodeError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidZipCodeError'
    Object.setPrototypeOf(this, InvalidZipCodeError.prototype)
  }
}
