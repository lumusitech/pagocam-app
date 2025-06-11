import { Address, Email, Name, Phone } from '@shared/domain/value-objects'
import { User, UserProps } from '@user/domain/entities/User'

import {
  IsActiveUserSpecification,
  IsAdminRoleSpecification,
  IsClientRoleSpecification,
} from '@user/domain/specification'
import { UserId, UserRole, UserStatus } from '@user/domain/value-objects'
import { UserPassword } from '@user/domain/value-objects/UserPassword'

describe('IsActiveUserSpecification', () => {
  let activeUserState: IsActiveUserSpecification
  let user: User
  let hashedPassword: string

  beforeEach(async () => {
    hashedPassword = 'dummy_hashed_password'
    activeUserState = new IsActiveUserSpecification()

    const props: UserProps = {
      id: UserId.create('1'),
      email: Email.create('some@email.com'),
      name: Name.create('John Doe'),
      password: UserPassword.create(hashedPassword),
      role: UserRole.CLIENT,
      status: UserStatus.ACTIVE,
      phone: Phone.create('1161619090'),
      address: Address.create({
        streetName: 'someStreet',
        streetNumber: '1111',
        city: 'Some City',
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    user = User.create(props)
  })

  it('should create an instance', () => {
    expect(activeUserState).toBeInstanceOf(IsActiveUserSpecification)
  })

  it('should return true if user is active', () => {
    expect(activeUserState.isSatisfiedBy(user)).toBe(true)
  })

  it('should return false if user is inactive', () => {
    user.changeStatus(UserStatus.INACTIVE)
    expect(activeUserState.isSatisfiedBy(user)).toBe(false)
  })

  it('should return false if user is pending email verification', () => {
    user.changeStatus(UserStatus.PENDING_EMAIL_VERIFICATION)
    expect(activeUserState.isSatisfiedBy(user)).toBe(false)
  })

  it('should return false if user is locked', () => {
    user.changeStatus(UserStatus.LOCKED)
    expect(activeUserState.isSatisfiedBy(user)).toBe(false)
  })

  it('should return true after changing from inactive back to active', () => {
    user.changeStatus(UserStatus.INACTIVE)
    user.changeStatus(UserStatus.ACTIVE)
    expect(activeUserState.isSatisfiedBy(user)).toBe(true)
  })

  it('should return true if user satisfies the specification - AND (client)', () => {
    const isActiveClient = activeUserState.and(new IsClientRoleSpecification()).isSatisfiedBy(user)
    expect(isActiveClient).toBe(true)
  })

  it('should return true if user satisfies one specification or the other - OR (client or admin)', () => {
    const isClientOrAdmin = new IsClientRoleSpecification()
      .or(new IsAdminRoleSpecification())
      .isSatisfiedBy(user)
    expect(isClientOrAdmin).toBe(true)
  })

  it('should return false if user is inactive AND a client', () => {
    user.changeStatus(UserStatus.INACTIVE)
    const isActiveClient = new IsActiveUserSpecification()
      .and(new IsClientRoleSpecification())
      .isSatisfiedBy(user)
    expect(isActiveClient).toBe(false)
  })
})
