import { CommonStatus } from '@shared/domain/constants/CommonStatus'
import { Status } from '@shared/domain/value-objects/Status'
import { ValueObjectProps } from '@shared/domain/value-objects/ValueObject'
import { UserSpecificStatus } from '../constants/UserSpecificStatus'
import { InvalidUserStatusError } from '../errors/InvalidUserStatusError'
import { UserStatusType } from '../types/UserStatusType'

interface UserStatusProps extends ValueObjectProps {
  value: UserStatusType
}

export class UserStatus extends Status<UserStatusType> {
  private constructor(props: UserStatusProps) {
    super(props)
  }

  public static create(statusValue: UserStatusType): UserStatus {
    if (!UserStatus.isValid(statusValue)) {
      throw new InvalidUserStatusError(`Invalid UserStatus value: "${statusValue}"`)
    }
    return new UserStatus({ value: statusValue })
  }

  public static fromPersistence(statusValue: string): UserStatus {
    if (!UserStatus.isValid(statusValue)) {
      throw new InvalidUserStatusError(
        `Invalid UserStatus value from persistence: "${statusValue}"`,
      )
    }

    return new UserStatus({ value: statusValue as UserStatusType })
  }

  private static isValid(statusValue: string): boolean {
    const validStatuses: string[] = [
      ...Object.values(CommonStatus),
      ...Object.values(UserSpecificStatus),
    ]

    return validStatuses.includes(statusValue)
  }

  public getValue(): UserStatusType {
    return this.props.value
  }

  public isPendingAdminVerification(): boolean {
    return this.props.value === 'pending_admin_approval'
  }

  public isPendingEmailVerification(): boolean {
    return this.props.value === 'pending_email_verification'
  }

  public isLocked(): boolean {
    return this.props.value === 'locked'
  }

  public toString() {
    return this.props.value
  }

  public equals(other: UserStatus): boolean {
    return this.props.value === other.props.value
  }

  // factory methods for status
  public static readonly ACTIVE = UserStatus.create('active')
  public static readonly INACTIVE = UserStatus.create('inactive')
  public static readonly PENDING_EMAIL_VERIFICATION = UserStatus.create(
    'pending_email_verification',
  )
  public static readonly PENDING_ADMIN_APPROVAL = UserStatus.create('pending_admin_approval')
  public static readonly LOCKED = UserStatus.create('locked')
  public static readonly SUSPENDED = UserStatus.create('suspended')
}
