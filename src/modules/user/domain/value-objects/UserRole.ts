import { InvalidUserRoleError } from '../errors/InvalidUserRoleError'

export enum UserRoleEnum {
  USER = 'user',
  GUEST = 'guest',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

export class UserRole {
  private readonly role: UserRoleEnum

  private constructor(role: UserRoleEnum) {
    this.role = role
  }

  static create(role: UserRoleEnum): UserRole {
    if (!UserRole.isValid(role)) {
      throw new InvalidUserRoleError(`Invalid UserRole: ${role}`)
    }
    return new UserRole(role)
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
}
