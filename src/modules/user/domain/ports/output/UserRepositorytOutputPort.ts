import { BaseRepositoryOutputPort } from '../../../../../shared/domain/ports/output/BaseRepositoryOutputPort'
import { Email } from '../../../../../shared/domain/value-objects'
import { User } from '../../entities/userV1'

export interface UserRepositoryOutputPort extends BaseRepositoryOutputPort<User, string> {
  findByEmail(email: Email): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
  findByPhone(phone: string): Promise<User | null>
}
