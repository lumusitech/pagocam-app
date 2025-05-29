import { InvalidArgumentError } from '../errors/generics/InvalidArgumentError'

export class Email {
  private constructor(readonly value: string) {
    if (!Email.isValid(value)) {
      throw new InvalidArgumentError(`Invalid email format: ${value}`)
    }
  }

  public static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  public static create(value: string): Email {
    return new Email(value)
  }

  public equals(other: Email): boolean {
    return this.value === other.value
  }

  public getValue(): string {
    return this.value
  }
}
