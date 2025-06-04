import { ValueObject, ValueObjectProps } from '@shared/domain/value-objects/ValueObject'
import { InvalidUserIdError } from '../errors/InvalidUserIdError'

interface UserIdProps extends ValueObjectProps {
  value: string
}

export class UserId extends ValueObject<UserIdProps> {
  private constructor(props: UserIdProps) {
    super(props)
  }

  public static create(value: string): UserId {
    if (!value) throw new InvalidUserIdError('Id cannot be empty.')
    return new UserId({ value })
  }

  public static fromPersistence(value: string): UserId {
    if (!value) throw new InvalidUserIdError('Id cannot be empty.')
    return new UserId({ value })
  }

  getValue(): string {
    return this.props.value
  }

  toString(): string {
    return this.props.value
  }

  equals(other: UserId): boolean {
    return this.props.value === other.props.value
  }
}
