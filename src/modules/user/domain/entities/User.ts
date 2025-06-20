import { Address, Email, Name, Phone } from '@shared/domain/value-objects'
import { UserStatusType } from '@user/domain/types/UserStatusType'
import {
  UserId,
  UserPassword,
  UserRole,
  UserRoleEnum,
  UserStatus,
} from '@user/domain/value-objects'

export type UserProps = {
  id: UserId
  email: Email
  name: Name
  password: UserPassword
  role: UserRole
  status: UserStatus
  phone?: Phone
  address?: Address
  createdAt: Date
  updatedAt?: Date
}

export type UserPrimitivesProps = {
  id: string
  email: string
  name: string
  password: string // hashed password
  role: string
  phone?: string
  status?: string
  address?: {
    streetName: string
    streetNumber: string
    city: string
    county?: string
    zipCode?: string
    province?: string
    floor?: string
    apartment?: string
    description?: string
  }
  createdAt: Date
  updatedAt?: Date
}

export class User {
  private constructor(private readonly userProps: UserProps) {
    if (!this.userProps.createdAt) {
      this.userProps.createdAt = new Date()
    }
  }

  public static create(userProps: UserProps): User {
    return new User(userProps)
  }

  public static fromPersistence(userProps: UserPrimitivesProps): User {
    return new User({
      id: UserId.create(userProps.id),
      email: Email.create(userProps.email),
      name: Name.create(userProps.name),
      password: UserPassword.create(userProps.password),
      role: UserRole.create(userProps.role as UserRoleEnum),
      status: UserStatus.create(userProps.status as UserStatusType),
      phone: userProps.phone ? Phone.create(userProps.phone) : undefined,
      address: userProps.address ? Address.create(userProps.address) : undefined,
      createdAt: userProps.createdAt,
      updatedAt: userProps.updatedAt ? userProps.updatedAt : undefined,
    })
  }

  /////////////////////////////////////////////////////////

  // Getters
  public getId(): UserId {
    return this.userProps.id
  }
  public getEmail(): Email {
    return this.userProps.email
  }
  public getName(): Name {
    return this.userProps.name
  }
  public getRole(): UserRole {
    return this.userProps.role
  }
  public getStatus(): UserStatus {
    return this.userProps.status
  }
  public getCreatedAt(): Date {
    return this.userProps.createdAt
  }
  public getUpdatedAt(): Date | undefined {
    return this.userProps.updatedAt
  }
  // Getters para propiedades que no están en la interfaz IUser pero son parte de CommonUserProps
  public getPassword(): UserPassword {
    return this.userProps.password
  }
  public getPhone(): Phone | undefined {
    return this.userProps.phone
  }
  public getAddress(): Address | undefined {
    return this.userProps.address
  }

  /////////////////////////////////////////////////////////

  // Behavior methods
  public changeEmail(newEmail: Email): void {
    if (!(newEmail instanceof Email)) {
      throw new TypeError('New email must be an instance of Email value object')
    }
    if (!this.userProps.email.equals(newEmail)) {
      this.userProps.email = newEmail
      this.userProps.updatedAt = new Date()
    }
  }

  public changeName(newName: Name): void {
    if (!(newName instanceof Name)) {
      throw new TypeError('New name must be an instance of Name value object')
    }
    if (!this.userProps.name.equals(newName)) {
      this.userProps.name = newName
      this.userProps.updatedAt = new Date()
    }
  }

  public changePassword(newPassword: UserPassword): void {
    if (!(newPassword instanceof UserPassword)) {
      throw new TypeError('New password must be an instance of UserPassword value object')
    }
    if (!this.userProps.password.equals(newPassword)) {
      this.userProps.password = newPassword
      this.userProps.updatedAt = new Date()
    }
  }

  public assignPhone(newPhone: Phone): void {
    if (!(newPhone instanceof Phone)) {
      throw new TypeError('Phone must be an instance of Phone value object')
    }

    if (!this.userProps.phone || !this.userProps.phone.equals(newPhone)) {
      this.userProps.phone = newPhone
      this.userProps.updatedAt = new Date()
    }
  }

  public removePhone(): void {
    if (this.userProps.phone !== undefined) {
      this.userProps.phone = undefined
      this.userProps.updatedAt = new Date()
    }
  }

  public assignAddress(newAddress: Address): void {
    if (!(newAddress instanceof Address)) {
      throw new TypeError('Address must be an instance of Address value object')
    }

    if (!this.userProps.address || !this.userProps.address.equals(newAddress)) {
      this.userProps.address = newAddress
      this.userProps.updatedAt = new Date()
    }
  }

  public removeAddress(): void {
    if (this.userProps.address !== undefined) {
      this.userProps.address = undefined
      this.userProps.updatedAt = new Date()
    }
  }

  public changeStatus(newStatus: UserStatus): void {
    if (!(newStatus instanceof UserStatus)) {
      throw new TypeError('Status must be an instance of UserStatus value object')
    }
    if (!this.userProps.status.equals(newStatus)) {
      this.userProps.status = newStatus
      this.userProps.updatedAt = new Date()
    }
  }

  public changeRole(newRole: UserRole): void {
    if (!(newRole instanceof UserRole)) {
      throw new TypeError('Role must be an instance of UserRole value object')
    }
    if (!this.userProps.role.equals(newRole)) {
      this.userProps.role = newRole
      this.userProps.updatedAt = new Date()
    }
  }

  /////////////////////////////////////////////////////////

  // Serialization methods
  public toPrimitives(): UserPrimitivesProps {
    return {
      id: this.userProps.id.getValue(),
      email: this.userProps.email.getValue(),
      name: this.userProps.name.getValue(),
      password: this.userProps.password.getValue(),
      role: this.userProps.role.getValue(),
      status: this.userProps.status.getValue(),
      phone: this.userProps.phone?.getValue(),
      address: this.userProps.address?.toPrimitives(),
      createdAt: this.userProps.createdAt,
      updatedAt: this.userProps.updatedAt,
    }
  }

  /////////////////////////////////////////////////////////

  // Utility methods
  public equals(other: User): boolean {
    if (!other || typeof other.getId !== 'function') return false

    return this.userProps.id.equals(other.getId())
  }

  public toString(): string {
    const { id, email, name, role } = this.userProps
    return `Id: ${id.getValue()}, User: ${name.getValue()}, Email: ${email.getValue()}, Role: ${role.getValue()}`
  }
}
