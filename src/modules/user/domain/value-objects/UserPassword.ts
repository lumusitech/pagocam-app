import { InvalidPasswordError } from '../errors/InvalidPasswordError'

export class UserPassword {
  private readonly password: string

  constructor(password: string) {
    if (!password || password.length < 6) {
      throw new InvalidPasswordError('Invalid UserPassword: Valid password is required')
    }
    this.password = password
  }

  static isValid(password: string): boolean {
    return !!password && password.length >= 6
  }

  static fromString(password: string): UserPassword {
    return new UserPassword(password)
  }

  static fromPersistence(password: string): UserPassword {
    if (!this.isValid(password)) {
      throw new InvalidPasswordError(
        'Invalid UserPassword: Password does not meet the requirements',
      )
    }
    return new UserPassword(password)
  }

  getHashedPassword(): string {
    return this.password
  }

  equals(other: UserPassword): boolean {
    return this.password === other.getHashedPassword()
  }
}
