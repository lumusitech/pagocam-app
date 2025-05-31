import { BaseRepositoryOutputPort } from '../../../../../shared/domain/ports/output/BaseRepositoryOutputPort'
import { Email, Phone } from '../../../../../shared/domain/value-objects'
import { User } from '../../entities/UserBase'
import { UserId } from '../../value-objects'

export interface UserRepositoryOutputPort extends BaseRepositoryOutputPort<User, UserId> {
  findByEmail(email: Email): Promise<User | null>
  findByPhone(phone: Phone): Promise<User | null>
}
