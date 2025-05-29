export class UserId {
  private readonly value: string

  constructor(value: string) {
    if (!value || typeof value !== 'string') {
      throw new Error('Invalid User ID')
    }
    this.value = value
  }

  getValue(): string {
    return this.value
  }

  toString(): string {
    return this.value
  }

  equals(other: UserId): boolean {
    return this.value === other.value
  }
}
