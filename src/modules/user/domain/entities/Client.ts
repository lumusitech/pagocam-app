// src/users/domain/entities/Client.ts
import { Address, Email, Name, Phone } from '../../../../shared/domain/value-objects' // Assuming these are in shared/domain/value-objects
import { InvalidUserRoleError } from '../errors/InvalidUserRoleError'

import { UserId, UserPassword, UserRole, UserStatus, UserStatusEnum } from '../value-objects' // Assuming these are in users/domain/value-objects
import { LoyaltyPoints } from '../value-objects/UserLoyaltyPoints'
import { CommonUserProps, UserBase, UserPrimitives } from './UserBase'

// Extend UserPrimitives for Client-specific fields
export type ClientPrimitives = UserPrimitives & {
  customerLoyaltyPoints?: number // Optional if default is 0 or not always present
}

export class Client extends UserBase {
  private customerLoyaltyPoints: LoyaltyPoints

  // Make constructor private/protected if you're using static factories
  protected constructor(props: CommonUserProps, customerLoyaltyPoints: LoyaltyPoints) {
    // Ensure the role is explicitly Client for ClientUser
    if (!props.role.equals(UserRole.CLIENT)) {
      throw new InvalidUserRoleError('Client must have a CLIENT role.')
    }
    super(props)
    this.customerLoyaltyPoints = customerLoyaltyPoints
  }

  /**
   * Factory method to create a new Client entity from raw input.
   * @param props The input properties for creating a client.
   * @returns A new Client instance.
   */
  public static create(props: {
    id: string
    email: string
    name: string
    password: string // Plain password to be hashed
    status: string
    phone?: string
    address?: any // Use a dedicated input type for Address if complex
    initialLoyaltyPoints?: number // Raw number
  }): Client {
    // Create CommonUserProps by converting primitives to VOs
    const commonProps: CommonUserProps = {
      id: UserId.create(props.id),
      email: Email.create(props.email),
      name: Name.create(props.name),
      password: UserPassword.create(props.password), // UserPassword handles hashing
      role: UserRole.CLIENT, // Explicitly set role for Client
      status: UserStatus.create(UserStatusEnum.ACTIVE),
      phone: props.phone ? Phone.create(props.phone) : undefined,
      address: props.address ? Address.create(props.address) : undefined,
      createdAt: new Date(),
      updatedAt: undefined,
    }

    const loyaltyPoints = LoyaltyPoints.create(props.initialLoyaltyPoints ?? 0) // Convert raw number to VO

    return new Client(commonProps, loyaltyPoints)
  }

  /**
   * Factory method to reconstruct a Client entity from persisted data.
   * @param props The persisted data in primitive format.
   * @returns A reconstructed Client instance.
   */
  public static fromPersistence(props: ClientPrimitives): Client {
    // Validate role from persistence
    if (props.role !== UserRole.CLIENT.getValue()) {
      throw new InvalidUserRoleError('Persisted user is not a CLIENT role.')
    }

    // Reconstruct CommonUserProps by converting primitives to VOs
    const commonProps: CommonUserProps = {
      id: UserId.fromPersistence(props.id),
      email: Email.fromPersistence(props.email),
      name: Name.fromPersistence(props.name),
      password: UserPassword.fromPersistence(props.password),
      role: UserRole.CLIENT, // Explicitly set role for Client
      status: props.status ? UserStatus.fromPersistence(props.status) : UserStatus.ACTIVE,
      phone: props.phone ? Phone.fromPersistence(props.phone) : undefined,
      address: props.address ? Address.fromPersistence(props.address) : undefined,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt,
    }

    const loyaltyPoints = LoyaltyPoints.fromPersistence(props.customerLoyaltyPoints ?? 0) // Reconstruct VO

    return new Client(commonProps, loyaltyPoints)
  }

  public addLoyaltyPoints(points: number): void {
    // Ensure points is a valid positive number if that's a rule
    if (points < 0) {
      throw new Error('Cannot add negative loyalty points.') // Or a specific domain error
    }
    this.customerLoyaltyPoints = this.customerLoyaltyPoints.add(points)
    this.userProps.updatedAt = new Date()
  }

  public getLoyaltyPoints(): LoyaltyPoints {
    return this.customerLoyaltyPoints
  }

  // Override toPrimitives to include client-specific data
  public override toPrimitives(): ClientPrimitives {
    return {
      ...super.toPrimitives(),
      customerLoyaltyPoints: this.customerLoyaltyPoints.getValue(),
    }
  }
}
