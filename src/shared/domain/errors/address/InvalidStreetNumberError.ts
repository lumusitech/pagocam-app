export class InvalidStreetNumberError extends Error {
  constructor(message: string = 'Invalid street number') {
    super(message)
    this.name = 'InvalidStreetNunmberError'
    Object.setPrototypeOf(this, InvalidStreetNumberError.prototype)
  }
}
