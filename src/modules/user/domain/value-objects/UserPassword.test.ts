import { UserPassword } from './UserPassword'

describe('UserId Value Object', () => {
  it('should create an UserPassword ValueObject', () => {
    const userPassword = UserPassword.create('123456')
    expect(userPassword).toBeInstanceOf(UserPassword)
  })

  it('it should throw an error if value is empty', () => {
    expect(() => UserPassword.create('')).toThrow('Password should not be empty')
  })

  it('it should throw an error if value is lower than 6 characters', () => {
    expect(() => UserPassword.create('123')).toThrow(
      'Password should be at least 6 characters long',
    )
  })

  it('should create an UserPassword ValueObject from persistence', () => {
    const userPassword = UserPassword.fromPersistence('123456')
    expect(userPassword).toBeInstanceOf(UserPassword)
  })

  it('it should throw an error if value is empty from persistence', () => {
    expect(() => UserPassword.fromPersistence('')).toThrow('Password should not be empty')
  })

  it('it should throw an error if value is lower than 6 characters from persistence', () => {
    expect(() => UserPassword.fromPersistence('123')).toThrow(
      'Password should be at least 6 characters long',
    )
  })

  it('should return true if value is valid', () => {
    expect(UserPassword.isValid('123456')).toBe(true)
  })

  it('should return false if value is invalid', () => {
    expect(UserPassword.isValid('123')).toBe(false)
  })

  it('should return a password value', () => {
    const userPassword = UserPassword.create('123456')
    expect(userPassword.getValue()).toBe('123456')
  })

  it('should compare two equal UserPassword values', () => {
    const userPassword1 = UserPassword.create('123456')
    const userPassword2 = UserPassword.create('123456')
    expect(userPassword1.equals(userPassword2)).toBe(true)
  })

  it('should compare two diferent UserPassword values', () => {
    const userPassword1 = UserPassword.create('123456')
    const userPassword2 = UserPassword.create('1234567')
    expect(userPassword1.equals(userPassword2)).toBe(false)
  })

  it('should return a string representation of UserPassword VO', () => {
    const userPassword = UserPassword.create('123456')
    expect(userPassword.toString()).toBe('123456')
  })

  it('should return a string representation of UserPassword VO', () => {
    const userPassword = UserPassword.create('123456')
    expect(userPassword.toString()).toBe('123456')
  })
})
