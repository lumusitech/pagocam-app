export class InvalidStreetNameError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidStreetNameError'
    Object.setPrototypeOf(this, InvalidStreetNameError.prototype)
  }
}
