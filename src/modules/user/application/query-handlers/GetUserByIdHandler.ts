import { User } from '../../domain/entities/UserBase'
import { UserNotFoundError } from '../../domain/errors/UserNotFoundError'
import { UserRepositoryOutputPort } from '../../domain/ports/output/UserRepositorytOutputPort'
import { UserId } from '../../domain/value-objects'
import { GetUserByIdQuery } from '../queries/getUserByIdQuery'

export class GetUserByIdQueryHandler {
  constructor(private readonly userRepository: UserRepositoryOutputPort) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    const userId = UserId.fromPersistence(query.id)
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError(userId.getValue())
    }
    return user
  }
}
