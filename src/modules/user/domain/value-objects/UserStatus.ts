import { ValueObject, ValueObjectProps } from '../../../../shared/domain/value-objects'
import { InvalidUserStatusError } from '../errors/InvalidUserStatusError'

export enum UserStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

interface UserStatusProps extends ValueObjectProps {
  value: UserStatusEnum
}

export class UserStatus extends ValueObject<UserStatusProps> {
  private constructor(props: UserStatusProps) {
    super(props)
  }

  public static create(status: UserStatusEnum): UserStatus {
    if (!UserStatus.isValidEnum(status)) {
      throw new InvalidUserStatusError(`Invalid UserStatus: "${status}"`)
    }
    return new UserStatus({ value: status })
  }

  public static fromPersistence(statusString: string): UserStatus {
    // Usamos isValidString para validar la entrada desde la persistencia
    if (!UserStatus.isValidString(statusString)) {
      throw new InvalidUserStatusError(`Invalid UserStatus from persistence: "${statusString}"`)
    }
    // Convertimos la cadena a UserStatusEnum y luego creamos la instancia
    return new UserStatus({ value: statusString as UserStatusEnum })
  }
  public static isValidEnum(status: UserStatusEnum): boolean {
    return Object.values(UserStatusEnum).includes(status)
  }

  public static isValidString(status: string): boolean {
    return Object.values(UserStatusEnum).includes(status as UserStatusEnum)
  }

  public getValue(): UserStatusEnum {
    return this.props.value
  }

  public equals(vo?: ValueObject<UserStatusProps>): boolean {
    if (vo === null || vo === undefined || !(vo instanceof UserStatus)) {
      return false
    }

    return this.props.value === vo.props.value
  }

  public toPrimitives(): string {
    return this.props.value
  }

  public toString(): string {
    return this.props.value
  }

  // Factory methods for common statuses
  public static readonly ACTIVE = new UserStatus({ value: UserStatusEnum.ACTIVE })
  public static readonly INACTIVE = new UserStatus({ value: UserStatusEnum.INACTIVE })
  public static readonly SUSPENDED = new UserStatus({ value: UserStatusEnum.SUSPENDED })
}
