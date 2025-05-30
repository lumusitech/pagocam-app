import { AndSpecification } from '../../../../shared/domain/specification/AndSpecification'
import { NotSpecification } from '../../../../shared/domain/specification/NotSpecification'
import { OrSpecification } from '../../../../shared/domain/specification/OrSpecification'
import { Specification } from '../../../../shared/domain/specification/Specification'
import { User } from '../entities/user'

export class RegisteredBeforeDaysSpecification implements Specification<User> {
  constructor(private readonly days: number) {}

  isSatisfiedBy(user: User): boolean {
    // Asegúrate de que user.getCreatedAt() devuelve un Date
    const createdAt = user.getCreatedAt()
    if (!createdAt) {
      // Si createdAt pudiera ser undefined en tu entidad User,
      // decide cómo manejarlo (ej. no cumple la especificación, o lanza un error).
      // Dado que lo hiciste obligatorio en el constructor de User, esto no debería pasar.
      return false
    }

    const thresholdDate = new Date()
    thresholdDate.setDate(thresholdDate.getDate() - this.days) // Resta los días a la fecha actual

    // Compara la fecha de creación del usuario con la fecha umbral
    return createdAt.getTime() < thresholdDate.getTime()
  }

  // Métodos para combinar especificaciones (heredados o implementados)
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
