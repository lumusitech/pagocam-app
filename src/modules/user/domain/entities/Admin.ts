// src/users/domain/entities/Admin.ts
import { UserRole } from '../value-objects'
import { CommonUserProps, UserBase } from './UserBase'

export class Admin extends UserBase {
  private readonly adminPermissions: string[]

  constructor(props: CommonUserProps, permissions: string[]) {
    super(props)
    this.adminPermissions = permissions
  }

  public manageUsers(): void {
    console.log(`Admin ${this.getName().getValue()} managing users.`)
  }

  public getPermissions(): string[] {
    return this.adminPermissions
  }

  public override changeRole(newRole: UserRole): void {
    if (newRole.equals(UserRole.SUPERADMIN)) {
      throw new Error('An Admin cannot directly elevate to SuperAdmin role.')
    }
    super.changeRole(newRole)
  }
}
