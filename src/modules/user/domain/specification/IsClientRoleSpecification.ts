import { AndSpecification } from '../../../../shared/domain/specification/AndSpecification'
import { NotSpecification } from '../../../../shared/domain/specification/NotSpecification'
import { OrSpecification } from '../../../../shared/domain/specification/OrSpecification'
import { Specification } from '../../../../shared/domain/specification/Specification'
import { User } from '../entities/user'
import { UserRole } from '../value-objects/UserRole'

export class IsClientRoleSpecification implements Specification<User> {
  isSatisfiedBy(user: User): boolean {
    return user.getRole().equals(UserRole.CLIENT)
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
