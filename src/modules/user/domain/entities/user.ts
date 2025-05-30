import { MissingFieldError } from '../../../../shared/domain/errors/generics/MissingFieldError'
import { Address } from '../../../../shared/domain/value-objects'
import { Email } from '../../../../shared/domain/value-objects/Email'
import { Name } from '../../../../shared/domain/value-objects/Name'
import { Phone } from '../../../../shared/domain/value-objects/Phone'
import { UserId } from '../value-objects/UserId'
import { UserPassword } from '../value-objects/UserPassword'
import { UserRole } from '../value-objects/UserRole'
import { UserStatus } from '../value-objects/UserStatus'

export type UserProps = {
  id: UserId
  email: Email
  name: Name
  password: UserPassword
  role: UserRole
  status: UserStatus
  phone?: Phone
  address?: Address
  createdAt?: Date
  updatedAt?: Date
}

// For serialization to primitives
export type UserPrimitives = {
  id: string
  email: string
  name: string
  password: string
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
  createdAt?: Date
  updatedAt?: Date
}

export class User {
  private constructor(private readonly userProps: UserProps) {
    if (!this.userProps.createdAt) {
      this.userProps.createdAt = new Date()
    }
  }

  static create(userProps: UserProps): User {
    const propsToUse = { ...userProps }

    if (!propsToUse.createdAt) {
      propsToUse.createdAt = new Date()
    }

    propsToUse.updatedAt = undefined

    User.validateRequiredFields(propsToUse)
    User.validateFieldsTypes(propsToUse)

    return new User(propsToUse)
  }

  static fromPersistence(userFromPersistence: UserProps): User {
    const propsToUse = { ...userFromPersistence }

    if (!propsToUse.createdAt) {
      propsToUse.createdAt = new Date()
    }

    User.validateRequiredFields(propsToUse)
    User.validateFieldsTypes(propsToUse)

    return new User(propsToUse)
  }

  private static validateRequiredFields(userProps: UserProps): void {
    const { id, email, name, password, role, status } = userProps
    if (!id || !email || !name || !password || !role || !status) {
      throw new MissingFieldError(
        'Invalid User: id, email, name, password, role, and status fields are required',
      )
    }
  }

  private static validateFieldsTypes(userProps: UserProps): void {
    const { id, email, name, password, status, role, phone, address } = userProps

    if (!(id instanceof UserId)) {
      throw new TypeError('ID must be an instance of UserId value object')
    }

    if (!(email instanceof Email)) {
      throw new TypeError('Email must be an instance of Email value object')
    }

    if (!(name instanceof Name)) {
      throw new TypeError('Name must be an instance of Name value object')
    }

    if (!(password instanceof UserPassword)) {
      throw new TypeError('Password must be an instance of UserPassword value object')
    }

    if (!(status instanceof UserStatus)) {
      throw new TypeError('Status must be an instance of UserStatus value object')
    }

    if (!(role instanceof UserRole)) {
      throw new TypeError('Role must be an instance of UserRole value object')
    }

    if (phone && !(phone instanceof Phone)) {
      throw new TypeError('Phone must be an instance of Phone value object')
    }

    if (address && !(address instanceof Address)) {
      throw new TypeError('Address must be an instance of Address value object')
    }
  }

  getLastLoginAt(): Date | undefined {
    return this.userProps.updatedAt
  }

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
    if (!this.userProps.phone?.equals(newPhone)) {
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

    if (!this.userProps.address?.equals(newAddress)) {
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

  getId(): UserId {
    return this.userProps.id
  }
  getEmail(): Email {
    return this.userProps.email
  }
  getName(): Name {
    return this.userProps.name
  }
  getPassword(): UserPassword {
    return this.userProps.password
  }
  getPhone(): Phone | undefined {
    return this.userProps.phone
  }
  getAddress(): Address | undefined {
    return this.userProps.address
  }
  getRole(): UserRole {
    return this.userProps.role
  }
  getStatus(): UserStatus | undefined {
    return this.userProps.status
  }
  getCreatedAt(): Date {
    return this.userProps.createdAt as Date
  }
  getUpdatedAt(): Date | undefined {
    return this.userProps.updatedAt
  }

  public toPrimitives(): UserPrimitives {
    return {
      id: this.userProps.id.getValue(),
      email: this.userProps.email.getValue(),
      name: this.userProps.name.getValue(),
      password: this.userProps.password.getHashedPassword(),
      role: this.userProps.role.getValue(),
      phone: this.userProps.phone?.getNormalizedNumber(),
      status: this.userProps.status?.getValue(),
      address: this.userProps.address?.toPrimitives(),
      createdAt: this.userProps.createdAt,
      updatedAt: this.userProps.updatedAt,
    }
  }

  toString(): string {
    const { id, email, name, role } = this.userProps
    return `Id: ${id.getValue()}, User: ${name.getValue()}, Email: ${email.getValue()}, Role: ${role.getValue()}`
  }

  equals(other: User): boolean {
    if (!(other instanceof User)) return false
    if (this.userProps.id === undefined || other.userProps.id === undefined) {
      return false
    }
    return this.userProps.id.equals(other.userProps.id)
  }
}
