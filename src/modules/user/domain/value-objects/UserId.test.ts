import { UserId } from './UserId'

describe('UserId Value Object', () => {
  it('should create an UserId ValueObject', () => {
    const userId = UserId.create('123')
    expect(userId).toBeInstanceOf(UserId)
  })

  it('it should throw an error if value is empty', () => {
    expect(() => UserId.create('')).toThrow('Id cannot be empty.')
  })

  it('should create an UserId ValueObject from persistence', () => {
    const userId = UserId.fromPersistence('123')
    expect(userId).toBeInstanceOf(UserId)
  })

  it('it should throw an error if value from persistence is empty', () => {
    expect(() => UserId.fromPersistence('')).toThrow('Id cannot be empty.')
  })

  it('should return the value of UserId VO', () => {
    const userId = UserId.create('123')
    expect(userId.getValue()).toBe('123')
  })

  it('should return a string representation of UserId VO', () => {
    const userId = UserId.create('123')
    expect(userId.toString()).toBe('123')
  })

  it('should compare two equal UserID VOs and return true', () => {
    const userId1 = UserId.create('123')
    const userId2 = UserId.create('123')
    expect(userId1.equals(userId2)).toBe(true)
  })
})
