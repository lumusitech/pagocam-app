import { InvalidEmailError } from '../errors/InvalidEmailError'
import { EMAIL_REGEX } from './constants/EmailRegex'
import { ValueObject, ValueObjectProps } from './ValueObject'

interface EmailProps extends ValueObjectProps {
  value: string
}

export class Email extends ValueObject<EmailProps> {
  private constructor(readonly props: EmailProps) {
    super(props)
  }

  public static isValid(email: string): boolean {
    return EMAIL_REGEX.test(email)
  }

  public static create(value: string): Email {
    if (!value || value.trim().length === 0) {
      throw new InvalidEmailError('Email cannot be empty.')
    }
    const trimmedValue = value.trim().toLowerCase()
    if (!EMAIL_REGEX.test(trimmedValue)) {
      throw new InvalidEmailError(`Invalid email format: "${value}"`)
    }
    return new Email({ value: trimmedValue })
  }

  public static fromPersistence(value: string) {
    if (!Email.isValid(value)) {
      throw new InvalidEmailError(`Invalid email format: ${value}`)
    }
    return new Email({ value })
  }

  public getValue(): string {
    return this.props.value
  }

  toPrimitives(): string {
    return this.props.value
  }

  public equals(other: Email): boolean {
    return this.props.value === other.props.value
  }
}
