import { ValueObject, ValueObjectProps } from '@shared/domain/value-objects/ValueObject'
import { InvalidPasswordError } from '../errors/InvalidPasswordError'

export interface UserPasswordProps extends ValueObjectProps {
  value: string
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  private constructor(props: UserPasswordProps) {
    super(props)
  }

  public static create(value: string) {
    if (!value) throw new InvalidPasswordError('Password should not be empty')

    if (!!value && value.length < 6)
      throw new InvalidPasswordError('Password should be at least 6 characters long')

    return new UserPassword({ value })
  }

  static fromPersistence(value: string): UserPassword {
    if (!value) throw new InvalidPasswordError('Password should not be empty')

    if (value && value.length < 6)
      throw new InvalidPasswordError('Password should be at least 6 characters long')

    return new UserPassword({ value })
  }

  static isValid(value: string): boolean {
    return !!value && value.length >= 6
  }

  getValue(): string {
    return this.props.value
  }

  equals(other: UserPassword): boolean {
    return this.props.value === other.getValue()
  }

  public toString(): string {
    return this.props.value
  }
}
