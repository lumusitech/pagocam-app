export class InvalidProvinceError extends Error {
  constructor(message: string = 'Invalid province') {
    super(message)
    this.name = 'InvalidAddressError'
    Object.setPrototypeOf(this, InvalidProvinceError.prototype)
  }
}
