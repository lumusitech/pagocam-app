export class InvalidArgumentError extends Error {
  constructor(message: string = 'Invalid argument') {
    super(message)
    this.name = 'InvalidArgumentError'
    Object.setPrototypeOf(this, InvalidArgumentError.prototype)
  }
}
