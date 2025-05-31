export interface ValueObjectProps {
  [index: string]: any
}

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T

  protected constructor(props: T) {
    this.props = Object.freeze(props)
  }

  public abstract equals(vo?: ValueObject<T>): boolean

  public abstract toPrimitives(): any

  public toString(): string {
    return JSON.stringify(this.props)
  }
}
