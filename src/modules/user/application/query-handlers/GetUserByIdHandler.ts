import { GetUserByIdQuery } from '@user/application/queries/getUserByIdQuery'
import { User } from '@user/domain/entities/User'
import { UserNotFoundError } from '@user/domain/errors/UserNotFoundError'
import { UserRepository } from '@user/domain/ports/output/UserRepository'
import { UserId } from '@user/domain/value-objects'

export class GetUserByIdQueryHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    const userId = UserId.create(query.id)
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError(userId.getValue())
    }
    return user
  }
}
