import { Phone } from './Phone'

describe('Phone Value Object', () => {
  it('should create a valid phone number', () => {
    const phone = Phone.create('1134567890')
    expect(phone.getPhoneNumber()).toBe('1134567890')
  })

  it('should throw an error if phone number is invalid', () => {
    expect(() => Phone.create('113456789')).toThrow('Invalid phone number')
  })

  it('should throw an error if phone number is empty', () => {
    expect(() => Phone.create('')).toThrow('Invalid phone number')
  })

  it('should create a valid phone number from persistence', () => {
    const phoneNumber = '1134567890'
    const phone = Phone.fromPersistence(phoneNumber)
    expect(phone.getPhoneNumber()).toBe(phoneNumber)
    expect(phone).toBeInstanceOf(Phone)
  })

  it('should throw an error if phone number from persistence is invalid', () => {
    const phoneNumber = '123456789'
    expect(() => Phone.fromPersistence(phoneNumber)).toThrow(
      `Invalid phone number from persistence`,
    )
  })

  it('should throw an error if phone number from persistence is empty', () => {
    const phoneNumber = ''
    expect(() => Phone.fromPersistence(phoneNumber)).toThrow(
      'Invalid phone number from persistence',
    )
  })

  it('should return the phone number value', () => {
    const phone = Phone.create('1134567890')
    expect(phone.getPhoneNumber()).toBe('1134567890')
  })

  it('should be equal to another name VO with the same value', () => {
    const phone1 = Phone.create('1134567890')
    const phone2 = Phone.create('1134567890')
    expect(phone1.equals(phone2)).toBe(true)
  })

  it('should not be equal to another name VO with different value', () => {
    const phone1 = Phone.create('1134567890')
    const phone2 = Phone.create('1124567890')
    expect(phone1.equals(phone2)).toBe(false)
  })

  it('should return a string representation of the name VO', () => {
    const phone = Phone.create('1134567890')
    expect(phone.toPrimitives()).toBe('1134567890')
  })

  it('should return a string representation of the name VO', () => {
    const phone = Phone.create('1134567890')
    expect(phone.toString()).toBe('1134567890')
  })
})
