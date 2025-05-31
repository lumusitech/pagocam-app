import { InvalidArgumentError } from './generics'

export class InvalidEmailError extends InvalidArgumentError {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidEmailError'

    Object.setPrototypeOf(this, InvalidEmailError.prototype)
  }
}
