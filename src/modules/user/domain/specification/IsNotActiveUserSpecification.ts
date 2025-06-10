import {
  AndSpecification,
  NotSpecification,
  OrSpecification,
  Specification,
} from '@shared/domain/specification/'
import { User } from '@user/domain/entities/User'
import { IsActiveUserSpecification } from '@user/domain/specification'

export class IsNotActiveUserSpecification implements Specification<User> {
  private readonly internalSpec: NotSpecification<User>

  constructor() {
    this.internalSpec = new NotSpecification(new IsActiveUserSpecification())
  }

  isSatisfiedBy(candidate: User): boolean {
    return this.internalSpec.isSatisfiedBy(candidate)
  }

  and(other: Specification<User>): Specification<User> {
    return new AndSpecification(this, other)
  }

  or(other: Specification<User>): Specification<User> {
    return new OrSpecification(this, other)
  }

  not(): Specification<User> {
    return new NotSpecification(this)
  }
}
