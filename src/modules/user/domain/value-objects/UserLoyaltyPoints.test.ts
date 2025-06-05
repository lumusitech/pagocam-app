import { LoyaltyPoints } from './UserLoyaltyPoints'

describe('LoyaltyPoints Value Object', () => {
  it('should create a valid LoyaltyPoints', () => {
    const loyaltyPoints = LoyaltyPoints.create(100)
    expect(loyaltyPoints.getValue()).toBe(100)
  })

  it('should throw an error if value is invalid', () => {
    expect(() => LoyaltyPoints.create(-1)).toThrow('Loyalty points cannot be negative.')
    expect(() => LoyaltyPoints.create(1.5)).toThrow('Loyalty points must be an integer.')
  })

  it('should create a LoyaltyPoints from persistence', () => {
    const loyaltyPoints = LoyaltyPoints.fromPersistence(100)
    expect(loyaltyPoints.getValue()).toBe(100)
  })

  it('should throw an error if value from persistence is invalid', () => {
    expect(() => LoyaltyPoints.fromPersistence(-1)).toThrow('Loyalty points cannot be negative.')
    expect(() => LoyaltyPoints.fromPersistence(1.5)).toThrow('Loyalty points must be an integer.')
  })

  it('should return the value of LoyaltyPoints', () => {
    const loyaltyPoints = LoyaltyPoints.create(100)
    expect(loyaltyPoints.getValue()).toBe(100)
  })

  it('should add points to LoyaltyPoints', () => {
    const loyaltyPoints = LoyaltyPoints.create(100)
    const newPoints = loyaltyPoints.add(50)
    expect(newPoints.getValue()).toBe(150)
  })

  it('should throw an error if adding a negative amount', () => {
    const loyaltyPoints = LoyaltyPoints.create(100)
    expect(() => loyaltyPoints.add(-1)).toThrow(
      'Cannot add a negative amount. Use subtract instead.',
    )
  })

  it('should subtract points from LoyaltyPoints', () => {
    const loyaltyPoints = LoyaltyPoints.create(100)
    const newPoints = loyaltyPoints.subtract(50)
    expect(newPoints.getValue()).toBe(50)
  })

  it('should throw an error if subtracting a negative amount', () => {
    const loyaltyPoints = LoyaltyPoints.create(100)
    expect(() => loyaltyPoints.subtract(-1)).toThrow(
      'Cannot subtract a negative amount. Use add instead.',
    )
  })

  it('should throw an error if subtracting more points than available', () => {
    const loyaltyPoints = LoyaltyPoints.create(100)
    expect(() => loyaltyPoints.subtract(101)).toThrow('Cannot subtract more points than available.')
  })

  it('should return a string representation of LoyaltyPoints', () => {
    const loyaltyPoints = LoyaltyPoints.create(100)
    expect(loyaltyPoints.toString()).toBe('100')
  })

  it('should compare two equal LoyaltyPoints', () => {
    const loyaltyPoints1 = LoyaltyPoints.create(100)
    const loyaltyPoints2 = LoyaltyPoints.create(100)
    expect(loyaltyPoints1.equals(loyaltyPoints2)).toBe(true)
  })

  it('should compare two different LoyaltyPoints', () => {
    const loyaltyPoints1 = LoyaltyPoints.create(100)
    const loyaltyPoints2 = LoyaltyPoints.create(200)
    expect(loyaltyPoints1.equals(loyaltyPoints2)).toBe(false)
  })

  it('should compare two different types, one invalid', () => {
    const loyaltyPoints = LoyaltyPoints.create(100)
    expect(loyaltyPoints.equals({} as LoyaltyPoints)).toBe(false)
  })
})
