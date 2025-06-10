import { AndSpecification, NotSpecification, OrSpecification } from '@shared/domain/specification'
import { Specification } from '@shared/domain/specification/Specification'

class MockSpecification<T> implements Specification<T> {
  private result: boolean

  constructor(result: boolean) {
    this.result = result
  }

  isSatisfiedBy(candidate: T): boolean {
    return this.result
  }

  and(other: Specification<T>): Specification<T> {
    return new AndSpecification(this, other)
  }
  or(other: Specification<T>): Specification<T> {
    return new OrSpecification(this, other)
  }
  not(): Specification<T> {
    return new NotSpecification(this)
  }
}

describe('OrSpecification', () => {
  it('should be satisfied if both left and right specifications are satisfied', () => {
    const leftSpec = new MockSpecification(true)
    const rightSpec = new MockSpecification(true)
    const orSpec = new OrSpecification(leftSpec, rightSpec)
    expect(orSpec.isSatisfiedBy('any-candidate')).toBe(true)
  })

  it('should be satisfied if left is satisfied and right is not', () => {
    const leftSpec = new MockSpecification(true)
    const rightSpec = new MockSpecification(false)
    const orSpec = new OrSpecification(leftSpec, rightSpec)
    expect(orSpec.isSatisfiedBy('any-candidate')).toBe(true)
  })

  it('should be satisfied if left is not satisfied and right is', () => {
    const leftSpec = new MockSpecification(false)
    const rightSpec = new MockSpecification(true)
    const orSpec = new OrSpecification(leftSpec, rightSpec)
    expect(orSpec.isSatisfiedBy('any-candidate')).toBe(true)
  })

  it('should not be satisfied if neither left nor right specifications are satisfied', () => {
    const leftSpec = new MockSpecification(false)
    const rightSpec = new MockSpecification(false)
    const orSpec = new OrSpecification(leftSpec, rightSpec)
    expect(orSpec.isSatisfiedBy('any-candidate')).toBe(false)
  })

  it('should return an AndSpecification when calling .and()', () => {
    const spec1 = new MockSpecification(true)
    const spec2 = new MockSpecification(false)
    const orSpec = new OrSpecification(spec1, spec2)
    const composedSpec = orSpec.and(new MockSpecification(true))
    expect(composedSpec).toBeInstanceOf(AndSpecification)
  })

  it('should return an OrSpecification when calling .or()', () => {
    const spec1 = new MockSpecification(true)
    const spec2 = new MockSpecification(false)
    const orSpec = new OrSpecification(spec1, spec2)
    const composedSpec = orSpec.or(new MockSpecification(true))
    expect(composedSpec).toBeInstanceOf(OrSpecification)
  })

  it('should return a NotSpecification when calling .not()', () => {
    const spec1 = new MockSpecification(true)
    const spec2 = new MockSpecification(false)
    const orSpec = new OrSpecification(spec1, spec2)
    const composedSpec = orSpec.not()
    expect(composedSpec).toBeInstanceOf(NotSpecification)
  })
})
