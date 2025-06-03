import { CommonStatus } from '@shared/domain/constants/CommonStatus'
import { Status } from '@shared/domain/value-objects/Status'
import { ValueObjectProps } from '@shared/domain/value-objects/ValueObject'
import { UserSpecificStatus } from '../constants/UserSpecificStatus'
import { UserStatusType } from '../types/UserStatusType'

interface UserStatusProps extends ValueObjectProps {
  value: UserStatusType
}

export class UserStatus extends Status<UserStatusType> {
  private constructor(props: UserStatusProps) {
    super(props)
  }

  public static create(statusValue: UserStatusType): UserStatus {
    return new UserStatus({ value: statusValue })
  }

  public static fromPersistence(statusValue: string): UserStatus {
    const validStatuses: string[] = [
      ...Object.values(CommonStatus),
      ...Object.values(UserSpecificStatus),
    ]

    if (!validStatuses.includes(statusValue)) {
      throw new Error(`Invalid UserStatus value from persistence: "${statusValue}"`)
    }

    return new UserStatus({ value: statusValue as UserStatusType })
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
}
