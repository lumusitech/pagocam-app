export class InvalidName extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidName'
    Object.setPrototypeOf(this, InvalidName.prototype)
  }
}
