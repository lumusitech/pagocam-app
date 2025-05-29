export class InvalidUserStatusError extends Error {
  constructor(message: string = 'Invalid user status') {
    super(message)
    this.name = 'InvalidUserStatusError'
    Object.setPrototypeOf(this, InvalidUserStatusError.prototype)
  }
}
