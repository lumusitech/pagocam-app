import { ValueObject, ValueObjectProps } from '../../../../shared/domain/value-objects'
import { InvalidUserRoleError } from '../errors/InvalidUserRoleError'

// Definimos el Enum para los roles de usuario
export enum UserRoleEnum {
  USER = 'user',
  CLIENT = 'client',
  GUEST = 'guest',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

interface UserRoleProps extends ValueObjectProps {
  value: UserRoleEnum
}

export class UserRole extends ValueObject<UserRoleProps> {
  private constructor(props: UserRoleProps) {
    super(props)
  }

  public static create(role: UserRoleEnum): UserRole {
    if (!UserRole.isValid(role)) {
      throw new InvalidUserRoleError(`Invalid UserRole: ${role}`)
    }
    return new UserRole({ value: role })
  }

  public static fromPersistence(roleString: string): UserRole {
    if (!UserRole.isValid(roleString)) {
      throw new InvalidUserRoleError(`Invalid UserRole from persistence: ${roleString}`)
    }

    return new UserRole({ value: roleString as UserRoleEnum })
  }

  public static isValid(role: string): boolean {
    return Object.values(UserRoleEnum).includes(role as UserRoleEnum)
  }

  public getValue(): UserRoleEnum {
    return this.props.value
  }

  public equals(vo?: ValueObject<UserRoleProps>): boolean {
    if (vo === null || vo === undefined || !(vo instanceof UserRole)) {
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

  // factory methods for common roles
  public static readonly USER = new UserRole({ value: UserRoleEnum.USER })
  public static readonly CLIENT = new UserRole({ value: UserRoleEnum.CLIENT })
  public static readonly GUEST = new UserRole({ value: UserRoleEnum.GUEST })
  public static readonly ADMIN = new UserRole({ value: UserRoleEnum.ADMIN })
  public static readonly SUPERADMIN = new UserRole({ value: UserRoleEnum.SUPERADMIN })
}
