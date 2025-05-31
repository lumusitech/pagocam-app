export class InvalidNameError extends Error {
  constructor(message: string = 'Invalid name') {
    super(message)
    this.name = 'InvalidName'
    Object.setPrototypeOf(this, InvalidNameError.prototype)
  }
}
