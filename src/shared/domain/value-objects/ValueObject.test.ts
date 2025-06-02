import { ValueObject } from './ValueObject'

class TestValueObject extends ValueObject<{ value: string }> {
  getValue(): string {
    return this.props.value
  }

  static create(value: string): TestValueObject {
    if (!value) {
      throw new Error('Value is required')
    }
    return new TestValueObject({ value })
  }
}

describe('Value Object Base', () => {
  it('should create a valid Value Object', () => {
    const valueObject = TestValueObject.create('test')
    expect(valueObject.getValue()).toBe('test')
  })

  it('should throw an error if value is empty', () => {
    expect(() => TestValueObject.create('')).toThrow('Value is required')
  })

  it('should to be equal to another TestValueObject', () => {
    const valueObject1 = TestValueObject.create('test')
    const valueObject2 = TestValueObject.create('test')
    expect(valueObject1.equals(valueObject2)).toBe(true)
  })

  it('should to be false if value or value.props is undefined or null', () => {
    const valueObject1 = TestValueObject.create('test')

    expect(valueObject1.equals(undefined)).toBe(false)
    expect(valueObject1.equals()).toBe(false)
  })

  it('should not to be equal to another TestValueObject', () => {
    const valueObject1 = TestValueObject.create('test')
    const valueObject2 = TestValueObject.create('test2')

    expect(valueObject1.equals(valueObject2)).toBe(false)
  })

  it('should return Value Object to string', () => {
    const valueObject = TestValueObject.create('test')
    expect(valueObject.toString()).toBe('{"value":"test"}')
  })
})
