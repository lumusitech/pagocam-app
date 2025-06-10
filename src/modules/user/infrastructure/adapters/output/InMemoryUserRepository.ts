import { User } from '@user/domain/entities/User'
import { UserRepository } from '@user/domain/ports/output/UserRepository'
import { UserId } from '@user/domain/value-objects'

const users = []

export class InMemoryUserRepository implements UserRepository {
  save(entity: User): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findById(id: UserId): Promise<any> {
    throw new Error('Method not implemented.')
  }

  delete(id: UserId): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }
}
