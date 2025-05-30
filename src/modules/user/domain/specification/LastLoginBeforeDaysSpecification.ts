import { AndSpecification } from '../../../../shared/domain/specification/AndSpecification'
import { NotSpecification } from '../../../../shared/domain/specification/NotSpecification'
import { OrSpecification } from '../../../../shared/domain/specification/OrSpecification'
import { Specification } from '../../../../shared/domain/specification/Specification'
import { User } from '../entities/user'

export class LastLoginBeforeDaysSpecification implements Specification<User> {
  constructor(private readonly days: number) {}

  isSatisfiedBy(user: User): boolean {
    if (!user.getLastLoginAt()) return true // Si nunca inició sesión, cumple el criterio
    const thresholdDate = new Date()
    thresholdDate.setDate(thresholdDate.getDate() - this.days)
    return user.getLastLoginAt()!.getTime() < thresholdDate.getTime()
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
