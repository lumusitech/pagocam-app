import { InvalidNameError } from '../errors/generics/InvalidNameError'
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, NAME_REGEX } from './constants'
import { ValueObject, ValueObjectProps } from './ValueObject'

interface NameProps extends ValueObjectProps {
  value: string
}

export class Name extends ValueObject<NameProps> {
  private constructor(props: NameProps) {
    super(props)
  }

  public static create(value: string): Name {
    if (!Name.isValid(value)) {
      throw new InvalidNameError(`Invalid name format`)
    }
    return new Name({ value })
  }

  public static fromPersistence(value: string): Name {
    if (!Name.isValid(value)) {
      throw new InvalidNameError(`Invalid name format`)
    }
    return new Name({ value })
  }

  public getValue(): string {
    return this.props.value
  }

  public toString(): string {
    return this.props.value
  }

  public static isValid(value: string): boolean {
    return (
      !!value &&
      value.length >= NAME_MIN_LENGTH &&
      value.length <= NAME_MAX_LENGTH &&
      NAME_REGEX.test(value)
    )
  }

  public static fromString(value: string): Name {
    if (!Name.isValid(value)) {
      throw new InvalidNameError(`Invalid name format`)
    }
    return new Name({ value })
  }

  public toPrimitives() {
    return this.props.value
  }

  public equals(other: Name): boolean {
    return this.props.value === other.getValue()
  }
}
