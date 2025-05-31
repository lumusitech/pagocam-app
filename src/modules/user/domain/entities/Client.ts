import { LoyaltyPoints } from '../value-objects/LoyaltyPoints'
import { CommonUserProps, UserBase } from './UserBase'
import { UserPrimitives } from './userV1'

export class Client extends UserBase {
  private customerLoyaltyPoints: LoyaltyPoints

  constructor(
    props: CommonUserProps,
    initialLoyaltyPoints: LoyaltyPoints = LoyaltyPoints.create(0),
  ) {
    super(props)
    this.customerLoyaltyPoints = initialLoyaltyPoints
  }

  public addLoyaltyPoints(points: number): void {
    this.customerLoyaltyPoints = this.customerLoyaltyPoints.add(points)
    this.userProps.updatedAt = new Date()
  }

  public getLoyaltyPoints(): LoyaltyPoints {
    return this.customerLoyaltyPoints
  }

  public override toPrimitives(): UserPrimitives & { customerLoyaltyPoints?: number } {
    return {
      ...super.toPrimitives(),
      customerLoyaltyPoints: this.customerLoyaltyPoints.getValue(),
    }
  }
}
