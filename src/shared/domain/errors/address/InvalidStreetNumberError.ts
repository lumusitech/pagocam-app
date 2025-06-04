export class InvalidStreetNumberError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidStreetNunmberError'
    Object.setPrototypeOf(this, InvalidStreetNumberError.prototype)
  }
}
