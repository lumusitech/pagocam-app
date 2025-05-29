export class InvalidAddressError extends Error {
  constructor(message: string = 'Invalid address') {
    super(message)
    this.name = 'InvalidAddressError'
    Object.setPrototypeOf(this, InvalidAddressError.prototype)
  }
}
