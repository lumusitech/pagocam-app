export class InvalidProvinceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidAddressError'
    Object.setPrototypeOf(this, InvalidProvinceError.prototype)
  }
}
