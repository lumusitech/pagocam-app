export class InvalidName extends Error {
  constructor(message: string = 'Invalid name') {
    super(message)
    this.name = 'InvalidName'
    Object.setPrototypeOf(this, InvalidName.prototype)
  }
}
