import { InvalidNameError } from '../errors/generics/InvalidNameError'
import { ValueObject, ValueObjectProps } from './'

interface NameProps extends ValueObjectProps {
  value: string
}

export class Name extends ValueObject<NameProps> {
  private constructor(props: NameProps) {
    super(props)
  }

  public static create(value: string): Name {
    if (!Name.isValid(value)) {
      throw new InvalidNameError(value)
    }
    return new Name({ value })
  }

  public static fromPersistence(value: string): Name {
    return new Name({ value })
  }

  public getValue(): string {
    return this.props.value
  }

  public toString(): string {
    return this.props.value
  }

  public static isValid(value: string): boolean {
    return !!value && value.length >= 3
  }

  public static fromString(value: string): Name {
    return new Name({ value })
  }

  public static toString(name: Name): string {
    return name.getValue()
  }

  public toPrimitives() {
    return this.props.value
  }

  public equals(other: Name): boolean {
    return this.props.value === other.getValue()
  }
}
