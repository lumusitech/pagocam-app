import { InvalidEmailError } from '../errors/InvalidEmailError'
import { Email } from './Email'

describe('Email Value Object', () => {
  it('should create a valid Email', () => {
    const email = Email.create('any.4abc@example.com')
    expect(email.getValue()).toBe('any.4abc@example.com')
  })

  it('should throw an error if email is invalid', () => {
    expect(() => Email.create('invalid-email')).toThrow(InvalidEmailError)
    expect(() => Email.create('invalid-email')).toThrow('Invalid email format: "invalid-email"')
  })

  it('should throw an error if email is empty', () => {
    expect(() => Email.create('')).toThrow(InvalidEmailError)
    expect(() => Email.create('')).toThrow('Email cannot be empty.')
  })

  it('should create a valid email from persistence', () => {
    const emailString = 'someemail@mail.com'
    const email = Email.fromPersistence(emailString)
    expect(email.getValue()).toBe(emailString)
    expect(email).toBeInstanceOf(Email)
  })

  it('should throw an error if email from persistence has invalid format', () => {
    const emailString = 'invalid-email'

    expect(() => Email.fromPersistence(emailString)).toThrow(InvalidEmailError)
    expect(() => Email.fromPersistence(emailString)).toThrow(
      'Invalid email format: "invalid-email"',
    )
  })

  it('should throw an error if email from persistence is empty', () => {
    const emailString = ''

    expect(() => Email.fromPersistence(emailString)).toThrow(InvalidEmailError)
    expect(() => Email.fromPersistence(emailString)).toThrow('Email cannot be empty.')
  })

  it('should return primitive value from Email Value Object', () => {
    const email = Email.create('any.4abc@example.com')
    expect(email.toPrimitives()).toBe('any.4abc@example.com')
  })

  it('should be equals', () => {
    const email1 = Email.create('any.4abc@example.com')
    const email2 = Email.create('any.4abc@example.com')
    expect(email1.equals(email2)).toBe(true)
  })

  it('should not to be equals', () => {
    const email1 = Email.create('any.4abc@example.com')
    const email2 = Email.create('other.4abc@example.com')
    expect(email1.equals(email2)).toBe(false)
  })
})
