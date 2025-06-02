export interface ValueObjectProps {
  [index: string]: any
}

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T

  protected constructor(props: T) {
    this.props = Object.freeze(props)
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false
    }

    return JSON.stringify(this.props) === JSON.stringify(vo.props)
  }

  public toString(): string {
    return JSON.stringify(this.props)
  }
}
