import {
  AndSpecification,
  NotSpecification,
  OrSpecification,
  Specification,
} from '@shared/domain/specification/'
import { User } from '@user/domain/entities/User'

import { UserRole } from '@user/domain/value-objects/UserRole'

export class IsAdminRoleSpecification implements Specification<User> {
  isSatisfiedBy(user: User): boolean {
    return user.getRole().equals(UserRole.ADMIN)
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
