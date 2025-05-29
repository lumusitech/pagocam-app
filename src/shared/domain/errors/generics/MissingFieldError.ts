export class MissingFieldError extends Error {
  constructor(message: string = 'Field is missing') {
    super(message)
    this.name = 'FieldMissingError'
    Object.setPrototypeOf(this, MissingFieldError.prototype)
  }
}
