export class InvalidStreetNameError extends Error {
  constructor(message: string = 'Invalid street name') {
    super(message)
    this.name = 'InvalidStreetNameError'
    Object.setPrototypeOf(this, InvalidStreetNameError.prototype)
  }
}
