import { AndSpecification } from '../../../../shared/domain/specification/AndSpecification'
import { NotSpecification } from '../../../../shared/domain/specification/NotSpecification'
import { OrSpecification } from '../../../../shared/domain/specification/OrSpecification'
import { Specification } from '../../../../shared/domain/specification/Specification'
import { User } from '../entities/userV1'
import { UserStatus } from '../value-objects/UserStatus'

export class IsActiveUserSpecification implements Specification<User> {
  isSatisfiedBy(user: User): boolean {
    return user.getStatus()?.equals(UserStatus.ACTIVE) ?? false
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
