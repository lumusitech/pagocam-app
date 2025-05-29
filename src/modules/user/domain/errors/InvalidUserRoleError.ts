export class InvalidUserRoleError extends Error {
  constructor(message: string = 'Invalid user role') {
    super(message)
    this.name = 'InvalidUserRoleError'
    Object.setPrototypeOf(this, InvalidUserRoleError.prototype)
  }
}
