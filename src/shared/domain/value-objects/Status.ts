import { CommonStatusType } from '@shared/domain/types/CommonStatusType'
import { ValueObject, ValueObjectProps } from '@shared/domain/value-objects/ValueObject'

interface StatusProps extends ValueObjectProps {
  value: CommonStatusType
}

export class Status extends ValueObject<StatusProps> {
  private constructor(props: StatusProps) {
    super(props)
  }

  public static create(statusValue: CommonStatusType): Status {
    return new Status({ value: statusValue })
  }

  public getValue(): CommonStatusType {
    return this.props.value
  }

  public isActive(): boolean {
    return this.props.value === 'active'
  }

  public isInactive(): boolean {
    return this.props.value === 'inactive'
  }

  equals(other: ValueObject<StatusProps>): boolean {
    return this.props.value === other.props.value
  }

  toString(): string {
    return this.props.value
  }
}
