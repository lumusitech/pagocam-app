export class InvalidPasswordError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidPasswordError'
    Object.setPrototypeOf(this, InvalidPasswordError.prototype)
  }
}
