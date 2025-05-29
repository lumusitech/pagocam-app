import { BaseRepository } from '../../../../shared/domain/ports/repository.output-port'
import { User } from '../entities/user'
import { UserEmail } from '../value-objects/UserEmail'

export interface UserRepository extends BaseRepository<User, string> {
  findByEmail(email: UserEmail): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
  findByPhone(phone: string): Promise<User | null>
}
