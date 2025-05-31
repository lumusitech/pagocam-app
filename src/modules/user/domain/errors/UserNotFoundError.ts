import {
  NotFoundError,
  NotFoundErrorProps,
} from '../../../../shared/domain/errors/generics/NotFoundError'

export class UserNotFoundError extends NotFoundError {
  constructor(id: string) {
    const props: NotFoundErrorProps = {
      entityName: 'User',
      id,
    }
    super(props)
    this.name = 'UserNotFoundError'

    Object.setPrototypeOf(this, UserNotFoundError.prototype)
  }
}
