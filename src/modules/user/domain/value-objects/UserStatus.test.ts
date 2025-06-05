import { UserStatusType } from '../types/UserStatusType'
import { UserStatus } from './UserStatus'

describe('UserStatus Value Object', () => {
  it('should create a UserStatus with a valid value', () => {
    const userStatus = UserStatus.create('active')
    expect(userStatus.getValue()).toBe('active')
    expect(userStatus.isPendingAdminVerification()).toBe(false)
    expect(userStatus.isPendingEmailVerification()).toBe(false)
    expect(userStatus.isLocked()).toBe(false)
    expect(userStatus.toString()).toBe('active')
  })

  it('should throw an error if value is invalid', () => {
    const statusValue = 'invalid'
    expect(() => UserStatus.create('invalid' as UserStatusType)).toThrow(
      `Invalid UserStatus value: "${statusValue}"`,
    )
  })

  it('should create a UserStatus with a valid value from persistence', () => {
    const userStatus = UserStatus.fromPersistence('active')
    expect(userStatus.getValue()).toBe('active')
    expect(userStatus.isPendingAdminVerification()).toBe(false)
    expect(userStatus.isPendingEmailVerification()).toBe(false)
    expect(userStatus.isLocked()).toBe(false)
    expect(userStatus.toString()).toBe('active')
  })

  it('should throw an error if value is invalid from persistence', () => {
    const statusString = 'invalid'
    expect(() => UserStatus.fromPersistence('invalid')).toThrow(
      `Invalid UserStatus value from persistence: "${statusString}"`,
    )
  })

  it('should return an user status value', () => {
    const userStatus = UserStatus.create('active')
    expect(userStatus.getValue()).toBe('active')
  })

  it('should return true if user is pending admin verfication', () => {
    const userStatus = UserStatus.create('pending_admin_approval')
    expect(userStatus.isPendingAdminVerification()).toBe(true)
  })

  it('should return false if user is not pending admin verfication', () => {
    const userStatus = UserStatus.create('active')
    expect(userStatus.isPendingAdminVerification()).toBe(false)
  })

  it('should return true if user is locked', () => {
    const userStatus = UserStatus.create('locked')
    expect(userStatus.isLocked()).toBe(true)
  })

  it('should return false if user is not locked', () => {
    const userStatus = UserStatus.create('active')
    expect(userStatus.isLocked()).toBe(false)
  })

  it('should return true if user is pending email verfication', () => {
    const userStatus = UserStatus.create('pending_email_verification')
    expect(userStatus.isPendingEmailVerification()).toBe(true)
  })

  it('should return false if user is not pending email verfication', () => {
    const userStatus = UserStatus.create('active')
    expect(userStatus.isPendingEmailVerification()).toBe(false)
  })

  it('should return a string representation of the user status', () => {
    const userStatus = UserStatus.create('active')
    expect(userStatus.toString()).toBe('active')
  })

  it('should compare two equal UserStatus values', () => {
    const userStatus1 = UserStatus.create('active')
    const userStatus2 = UserStatus.create('active')
    expect(userStatus1.equals(userStatus2)).toBe(true)
  })

  it('should compare two diferent UserStatus values', () => {
    const userStatus1 = UserStatus.create('active')
    const userStatus2 = UserStatus.create('locked')
    expect(userStatus1.equals(userStatus2)).toBe(false)
  })
})
