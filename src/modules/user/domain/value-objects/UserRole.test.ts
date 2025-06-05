import { UserRole, UserRoleEnum } from './UserRole'

describe('UserRole Value Object', () => {
  it('should create a valid UserRole', () => {
    const userRole = UserRole.create(UserRoleEnum.USER)
    expect(userRole).toBeInstanceOf(UserRole)
  })

  it('should throw an error if role is invalid', () => {
    expect(() => UserRole.create('invalid' as UserRoleEnum)).toThrow('Invalid UserRole: invalid')
  })

  it('should create a valid UserRole from persistence', () => {
    const userRole = UserRole.fromPersistence(UserRoleEnum.USER)
    expect(userRole).toBeInstanceOf(UserRole)
  })

  it('should throw an error if role is invalid from persistence', () => {
    const roleString = 'invalid'
    expect(() => UserRole.fromPersistence('invalid')).toThrow(
      `Invalid UserRole from persistence: ${roleString}`,
    )
  })

  it('should validate as true if role is valid', () => {
    const role = UserRoleEnum.USER
    expect(UserRole.isValid(role)).toBe(true)
  })

  it('should validate as false if role is invalid', () => {
    const role = 'invalid'
    expect(UserRole.isValid(role)).toBe(false)
  })

  it('should return an user role value', () => {
    const role = UserRoleEnum.USER
    const userRole = UserRole.create(role)
    expect(userRole.getValue()).toBe(role)
  })

  it('should return a string representation of the user role', () => {
    const role = UserRoleEnum.USER
    const userRole = UserRole.create(role)
    expect(userRole.toString()).toBe(role)
  })

  it('should compare equality of two UserRoles with same value', () => {
    const role = UserRoleEnum.USER
    const userRole1 = UserRole.create(role)
    const userRole2 = UserRole.create(role)
    expect(userRole1.equals(userRole2)).toBe(true)
  })

  it('should compare equality of two UserRoles with different value', () => {
    const role1 = UserRoleEnum.USER
    const role2 = UserRoleEnum.CLIENT
    const userRole1 = UserRole.create(role1)
    const userRole2 = UserRole.create(role2)
    expect(userRole1.equals(userRole2)).toBe(false)
  })

  it('should compare equality of two UserRoles with different type, one invalid', () => {
    const role = UserRoleEnum.USER
    const userRole = UserRole.create(role)
    expect(userRole.equals({} as UserRole)).toBe(false)
  })
})
