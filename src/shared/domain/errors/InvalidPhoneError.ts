export class InvalidPhoneError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidPhoneError'
    Object.setPrototypeOf(this, InvalidPhoneError.prototype)
  }
}
