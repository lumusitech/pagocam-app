import {
  AndSpecification,
  NotSpecification,
  OrSpecification,
  Specification,
} from '@shared/domain/specification/'
import { User } from '@user/domain/entities/User'

import { UserStatus } from '@user/domain/value-objects/UserStatus'

export class IsActiveUserSpecification implements Specification<User> {
  isSatisfiedBy(user: User): boolean {
    return user.getStatus()?.equals(UserStatus.ACTIVE)
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
