export class MissingFieldError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FieldMissingError'
    Object.setPrototypeOf(this, MissingFieldError.prototype)
  }
}
