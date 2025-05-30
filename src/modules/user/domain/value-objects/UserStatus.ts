import { InvalidUserStatusError } from '../errors/InvalidUserStatusError'

export enum UserStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export class UserStatus {
  private constructor(private readonly status: UserStatusEnum) {}

  private static _createValidated(status: UserStatusEnum): UserStatus {
    return new UserStatus(status)
  }

  static create(status: UserStatusEnum): UserStatus {
    if (!UserStatus.isValidEnum(status)) {
      throw new InvalidUserStatusError(`Invalid UserStatus: "${status}"`)
    }
    return UserStatus._createValidated(status)
  }

  static isValidEnum(status: UserStatusEnum): boolean {
    return Object.values(UserStatusEnum).includes(status)
  }

  static isValidString(status: string): boolean {
    return Object.values(UserStatusEnum).includes(status as UserStatusEnum)
  }

  static fromPersistence(status: string): UserStatus {
    if (!UserStatus.isValidString(status)) {
      // Usar la validación específica para string
      throw new InvalidUserStatusError(`Invalid UserStatus from persistence: "${status}"`)
    }
    // Asegurar que el string se convierta al enum para el constructor
    return UserStatus._createValidated(status as UserStatusEnum)
  }

  getValue(): UserStatusEnum {
    return this.status
  }

  toString(): string {
    return this.status
  }

  equals(other: UserStatus): boolean {
    if (!(other instanceof UserStatus)) {
      return false
    }
    return this.status === other.getValue()
  }

  // Factory methods for easy change of status
  static ACTIVE = UserStatus._createValidated(UserStatusEnum.ACTIVE)
  static INACTIVE = UserStatus._createValidated(UserStatusEnum.INACTIVE)
  static SUSPENDED = UserStatus._createValidated(UserStatusEnum.SUSPENDED)
}
