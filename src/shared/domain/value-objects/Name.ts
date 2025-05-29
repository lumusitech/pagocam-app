import { InvalidName } from '../errors/generics/InvalidNameError'

export class Name {
  private readonly value: string

  constructor(name: string) {
    if (!name || name.length < 3) {
      throw new InvalidName('Invalid UserName: Valid name is required')
    }
    this.value = name
  }

  public getValue(): string {
    return this.value
  }

  public toString(): string {
    return this.value
  }

  public static isValid(name: string): boolean {
    return !!name && name.length >= 3
  }

  public static fromString(name: string): Name {
    return new Name(name)
  }

  public static toString(name: Name): string {
    return name.getValue()
  }

  public equals(other: Name): boolean {
    return this.value === other.getValue()
  }
}
