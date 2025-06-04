import { NotFoundError } from '@shared/domain/errors/generics/NotFoundError'

export class UserNotFoundError extends NotFoundError {
  constructor(message: string) {
    super(message)
    this.name = 'UserNotFoundError'
    Object.setPrototypeOf(this, UserNotFoundError.prototype)
  }
}
