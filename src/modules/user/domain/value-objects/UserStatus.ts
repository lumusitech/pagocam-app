import { InvalidUserStatusError } from '../errors/InvalidUserStatusError'

export enum UserStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export class UserStatus {
  private readonly status: UserStatusEnum

  private constructor(status: UserStatusEnum) {
    this.status = status
  }

  static create(status: UserStatusEnum): UserStatus {
    if (!UserStatus.isValid(status)) {
      throw new InvalidUserStatusError(`Invalid UserStatus: ${status}`)
    }
    return new UserStatus(status)
  }

  static isValid(status: string): boolean {
    return Object.values(UserStatusEnum).includes(status as UserStatusEnum)
  }

  static fromPersistence(status: string): UserStatus {
    if (!UserStatus.isValid(status)) {
      throw new InvalidUserStatusError(`Invalid UserStatus: ${status}`)
    }
    return new UserStatus(status as UserStatusEnum)
  }

  getValue(): UserStatusEnum {
    return this.status
  }

  toString(): string {
    return this.status
  }

  equals(other: UserStatus): boolean {
    return this.status === other.getValue()
  }
}
