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

describe('NotSpecification', () => {
  it('should be satisfied when the inner specification is NOT satisfied', () => {
    const innerSpec = new MockSpecification(false)
    const notSpec = new NotSpecification(innerSpec)
    expect(notSpec.isSatisfiedBy('any-candidate')).toBe(true)
  })

  it('should NOT be satisfied when the inner specification IS satisfied', () => {
    const innerSpec = new MockSpecification(true)
    const notSpec = new NotSpecification(innerSpec)
    expect(notSpec.isSatisfiedBy('any-candidate')).toBe(false)
  })

  it('should return an AndSpecification when calling .and()', () => {
    const innerSpec = new MockSpecification(true)
    const notSpec = new NotSpecification(innerSpec)
    const composedSpec = notSpec.and(new MockSpecification(true))
    expect(composedSpec).toBeInstanceOf(AndSpecification)
  })

  it('should return an OrSpecification when calling .or()', () => {
    const innerSpec = new MockSpecification(true)
    const notSpec = new NotSpecification(innerSpec)
    const composedSpec = notSpec.or(new MockSpecification(false))
    expect(composedSpec).toBeInstanceOf(OrSpecification)
  })

  it('should return a NotSpecification when calling .not()', () => {
    const innerSpec = new MockSpecification(true)
    const notSpec = new NotSpecification(innerSpec)
    const composedSpec = notSpec.not()
    expect(composedSpec).toBeInstanceOf(NotSpecification)
  })
})
