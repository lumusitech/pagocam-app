export class InvalidUserRoleError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidUserRoleError'
    Object.setPrototypeOf(this, InvalidUserRoleError.prototype)
  }
}
