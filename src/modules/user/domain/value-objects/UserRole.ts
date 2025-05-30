import { InvalidUserRoleError } from '../errors/InvalidUserRoleError'

export enum UserRoleEnum {
  USER = 'user',
  CLIENT = 'client',
  GUEST = 'guest',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

export class UserRole {
  private readonly role: UserRoleEnum

  private constructor(role: UserRoleEnum) {
    this.role = role
  }

  private static _createValidated(role: UserRoleEnum): UserRole {
    return new UserRole(role)
  }

  static create(role: UserRoleEnum): UserRole {
    if (!UserRole.isValid(role)) {
      throw new InvalidUserRoleError(`Invalid UserRole: ${role}`)
    }
    return this._createValidated(role)
  }

  static isValid(role: string): boolean {
    return Object.values(UserRoleEnum).includes(role as UserRoleEnum)
  }

  static fromPersistence(role: string): UserRole {
    if (!UserRole.isValid(role)) {
      throw new InvalidUserRoleError(`Invalid UserRole: ${role}`)
    }
    return new UserRole(role as UserRoleEnum)
  }

  getValue(): UserRoleEnum {
    return this.role
  }

  toString(): string {
    return this.role
  }

  equals(other: UserRole): boolean {
    return this.role === other.getValue()
  }

  // Static factory methods for common roles
  static USER = UserRole._createValidated(UserRoleEnum.USER)
  static CLIENT = UserRole._createValidated(UserRoleEnum.CLIENT)
  static GUEST = UserRole._createValidated(UserRoleEnum.GUEST)
  static ADMIN = UserRole._createValidated(UserRoleEnum.ADMIN)
  static SUPERADMIN = UserRole._createValidated(UserRoleEnum.SUPERADMIN)
}
