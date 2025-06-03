import { ValueObject, ValueObjectProps } from './ValueObject'

interface StatusProps<T extends string> extends ValueObjectProps {
  value: T
}

export class Status<T extends string> extends ValueObject<StatusProps<T>> {
  constructor(props: StatusProps<T>) {
    super(props)
  }

  public getValue(): T {
    return this.props.value
  }

  public isActive(): boolean {
    return this.props.value === 'active'
  }

  public isInactive(): boolean {
    return this.props.value === 'inactive'
  }

  public isSuspended(): boolean {
    return this.props.value === 'suspended'
  }

  public toString(): string {
    return this.props.value
  }

  public equals(other?: Status<T>): boolean {
    if (!other || !(other instanceof Status)) {
      return false
    }
    return this.props.value === other.props.value
  }
}
