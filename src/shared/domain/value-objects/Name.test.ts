import { InvalidNameError } from '../errors/generics'
import { Name } from './Name'

describe('name Value Object', () => {
  it('should create a valid name', () => {
    const name = Name.create('Luciano Figueroa')
    expect(name.getValue()).toBe('Luciano Figueroa')
  })

  it('should throw an error if name is invalid', () => {
    expect(() => Name.create('1nv4l1d-n4m3')).toThrow(InvalidNameError)
    expect(() => Name.create('ab')).toThrow(InvalidNameError)
    expect(() => Name.create('')).toThrow(InvalidNameError)
    expect(() => Name.create('1nv4l1d-n4m3')).toThrow('Invalid name format')
  })

  it('should create a valid name from persistence', () => {
    const nameString = 'Luciano Figueroa'
    const name = Name.fromPersistence(nameString)
    expect(name.getValue()).toBe(nameString)
    expect(name).toBeInstanceOf(Name)
  })

  it('should throw an error if name from persistence has invalid format', () => {
    const nameString = '1nv4l1d-n4m3'

    expect(() => Name.fromPersistence(nameString)).toThrow(InvalidNameError)
    expect(() => Name.fromPersistence(nameString)).toThrow('Invalid name format')
  })

  it('should throw an error if name from persistence is empty', () => {
    const nameString = ''

    expect(() => Name.fromPersistence(nameString)).toThrow(InvalidNameError)
    expect(() => Name.fromPersistence(nameString)).toThrow('Invalid name format')
  })

  it('should return primitive value from name Value Object', () => {
    const name = Name.create('Luciano Figueroa')
    expect(name.toPrimitives()).toBe('Luciano Figueroa')
  })

  it('should be equals', () => {
    const name1 = Name.create('Luciano Figueroa')
    const name2 = Name.create('Luciano Figueroa')
    expect(name1.equals(name2)).toBe(true)
  })

  it('should not to be equals', () => {
    const name1 = Name.create('Luciano Figueroa')
    const name2 = Name.create('Carlos Luciano Figueroa')
    expect(name1.equals(name2)).toBe(false)
  })

  it('should return Name VO to string', () => {
    const name = Name.create('Luciano Figueroa')
    expect(name.toString()).toBe('Luciano Figueroa')
  })

  it('should create Name VO from string', () => {
    const name = Name.fromString('Luciano Figueroa')
    expect(name.getValue()).toBe('Luciano Figueroa')
  })

  it('should throw an error with invalid string name', () => {
    const invalidNameString = 'Lu'
    expect(() => Name.fromString(invalidNameString)).toThrow(InvalidNameError)
    expect(() => Name.fromString(invalidNameString)).toThrow('Invalid name format')
  })
})
