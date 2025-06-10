import { Repository } from '@shared/domain/ports/output/Repository'
import { User } from '@user/domain/entities/User'
import { UserId } from '@user/domain/value-objects'

export interface UserRepository extends Repository<User, UserId> {}
