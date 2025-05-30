import { UserRepositoryOutputPort } from '../../domain/ports/output/UserRepositorytOutputPort'
import { IsClientRoleSpecification } from '../../domain/specification/IsClientRoleSpecification'
import { IsNotActiveUserSpecification } from '../../domain/specification/IsNotActiveUserSpecification'
import { RegisteredBeforeDaysSpecification } from '../../domain/specification/RegisteredBeforeDaysSpecification'
import { UserStatus } from '../../domain/value-objects/UserStatus'

export class ManageUserStatusUseCase {
  constructor(private readonly userRepository: UserRepositoryOutputPort) {}

  async execute(): Promise<void> {
    if (!this.userRepository?.findAll) {
      throw new Error('UserRepository or its findAll method is undefined')
    }
    const allUsers = await this.userRepository.findAll()

    // Rule 1: Activate users who registered more than 7 days ago and are not yet active.
    const eligibleToActivateSpec = new RegisteredBeforeDaysSpecification(7).and(
      new IsNotActiveUserSpecification(),
    )

    const usersToActivate = allUsers.filter(user => eligibleToActivateSpec.isSatisfiedBy(user))

    for (const user of usersToActivate) {
      console.log(`Activating user: ${user.getId().getValue()} - ${user.getName().getValue()}`)
      user.changeStatus(UserStatus.ACTIVE)
      await this.userRepository.save(user)
    }

    // Rule 2: Deactivate clients who haven't updated their information in 90 days (using createdAt as a proxy).
    const eligibleToDeactivateClientSpec = new RegisteredBeforeDaysSpecification(90).and(
      new IsClientRoleSpecification(),
    )

    const clientsToDeactivate = allUsers.filter(user =>
      eligibleToDeactivateClientSpec.isSatisfiedBy(user),
    )

    for (const user of clientsToDeactivate) {
      console.log(`Deactivating client: ${user.getId().getValue()} - ${user.getName().getValue()}`)
      user.changeStatus(UserStatus.INACTIVE)
      await this.userRepository.save(user)
    }

    // TODO: Call a Logger service instead of console.log in production code
    // TODO: send event to a message broker or event bus
    console.log('User status management completed.')
  }
}
