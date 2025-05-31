import { ValueObject, ValueObjectProps } from '../../../../shared/domain/value-objects'

interface LoyaltyPointsProps extends ValueObjectProps {
  value: number
}

export class LoyaltyPoints extends ValueObject<LoyaltyPointsProps> {
  private constructor(props: LoyaltyPointsProps) {
    super(props)
  }

  public static create(value: number): LoyaltyPoints {
    if (value < 0) {
      throw new Error('Loyalty points cannot be negative.')
    }
    if (!Number.isInteger(value)) {
      throw new Error('Loyalty points must be an integer.')
    }
    return new LoyaltyPoints({ value })
  }

  public static fromPersistence(value: number): LoyaltyPoints {
    return LoyaltyPoints.create(value)
  }

  public getValue(): number {
    return this.props.value
  }

  public add(amount: number): LoyaltyPoints {
    if (amount < 0) {
      throw new Error('Cannot add a negative amount. Use subtract instead.')
    }
    return LoyaltyPoints.create(this.props.value + amount)
  }

  public subtract(amount: number): LoyaltyPoints {
    if (amount < 0) {
      throw new Error('Cannot subtract a negative amount. Use add instead.')
    }
    const newValue = this.props.value - amount
    return LoyaltyPoints.create(newValue)
  }

  public toPrimitives(): number {
    return this.props.value
  }

  public equals(vo?: ValueObject<LoyaltyPointsProps>): boolean {
    if (vo === null || vo === undefined || !(vo instanceof LoyaltyPoints)) {
      return false
    }

    return this.props.value === vo.props.value
  }
}
