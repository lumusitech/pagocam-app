export class InvalidUserStatusError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidUserStatusError'
    Object.setPrototypeOf(this, InvalidUserStatusError.prototype)
  }
}
