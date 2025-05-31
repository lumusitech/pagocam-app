import { ValueObject, ValueObjectProps } from '../../../../shared/domain/value-objects'
import { InvalidPasswordError } from '../errors/InvalidPasswordError'

export interface UserPasswordProps extends ValueObjectProps {
  value: string
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  private constructor(props: UserPasswordProps) {
    super(props)
  }

  public static create(value: string) {
    if (!value || value.length < 6) {
      throw new InvalidPasswordError('Invalid UserPassword: Valid password is required')
    }

    return new UserPassword({ value })
  }

  static isValid(value: string): boolean {
    return !!value && value.length >= 6
  }

  static fromPersistence(value: string): UserPassword {
    if (!this.isValid(value)) {
      throw new InvalidPasswordError(
        'Invalid UserPassword: Password does not meet the requirements',
      )
    }
    return new UserPassword({ value })
  }

  getHashedPassword(): string {
    return this.props.value
  }

  equals(other: UserPassword): boolean {
    return this.props.value === other.getHashedPassword()
  }

  toPrimitives(): string {
    return this.props.value
  }
}
