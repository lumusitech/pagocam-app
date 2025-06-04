export class InvalidUserIdError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidUserIdError'
    Object.setPrototypeOf(this, InvalidUserIdError.prototype)
  }
}
