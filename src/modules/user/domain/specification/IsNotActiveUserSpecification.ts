import { AndSpecification } from '../../../../shared/domain/specification/AndSpecification'
import { NotSpecification } from '../../../../shared/domain/specification/NotSpecification'
import { OrSpecification } from '../../../../shared/domain/specification/OrSpecification'
import { Specification } from '../../../../shared/domain/specification/Specification'
import { User } from '../entities/user'
import { IsActiveUserSpecification } from './IsActiveUserSpecification'

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
