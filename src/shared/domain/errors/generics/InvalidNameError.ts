export class InvalidNameError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidName'
    Object.setPrototypeOf(this, InvalidNameError.prototype)
  }
}
