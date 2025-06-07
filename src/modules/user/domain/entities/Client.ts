import { Address, Email, Name, Phone } from '@shared/domain/value-objects'
import { CommonUserProps, UserBase, UserPrimitives } from '@user/domain/entities/UserBase'
import { InvalidUserRoleError } from '@user/domain/errors/InvalidUserRoleError'
import { UserId, UserPassword, UserRole, UserStatus } from '@user/domain/value-objects'
import { LoyaltyPoints } from '@user/domain/value-objects/UserLoyaltyPoints'

export type SpecificClientPrimitives = {
  loyaltyPoints: number
}

export type ClientPrimitives = UserPrimitives & SpecificClientPrimitives

export type SpecificClientProps = {
  loyaltyPoints: LoyaltyPoints
}

export class Client extends UserBase {
  private specificClientProps: SpecificClientProps

  private constructor(commonUserProps: CommonUserProps, specificClientProps: SpecificClientProps) {
    // Ensure the role is explicitly Client for ClientUser
    if (!commonUserProps.role.equals(UserRole.CLIENT)) {
      throw new InvalidUserRoleError('Client must have a CLIENT role.')
    }
    super(commonUserProps)
    this.specificClientProps = specificClientProps
  }

  public static create(
    commonUserProps: CommonUserProps,
    specificClientProps: SpecificClientProps,
  ): Client {
    return new Client(commonUserProps, specificClientProps)
  }

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

    const loyaltyPoints = LoyaltyPoints.fromPersistence(props.loyaltyPoints ?? 0)

    return new Client(commonProps, { loyaltyPoints: loyaltyPoints })
  }

  public addLoyaltyPoints(points: number): void {
    this.specificClientProps.loyaltyPoints = this.specificClientProps.loyaltyPoints.add(points)
    this.userProps.updatedAt = new Date()
  }

  public getLoyaltyPoints(): LoyaltyPoints {
    return this.specificClientProps.loyaltyPoints
  }

  // Override toPrimitives to include client-specific data
  public override toPrimitives(): ClientPrimitives {
    return {
      ...super.toPrimitives(),
      loyaltyPoints: this.specificClientProps.loyaltyPoints.getValue(),
    }
  }
}
