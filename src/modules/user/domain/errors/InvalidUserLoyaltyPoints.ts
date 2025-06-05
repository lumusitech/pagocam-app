export class UserLoyaltyPointsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserLoyaltyPointsError'
    Object.setPrototypeOf(this, UserLoyaltyPointsError.prototype)
  }
}
