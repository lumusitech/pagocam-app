import { InvalidPhoneError } from '../errors/InvalidPhoneError'
import { ValueObject, ValueObjectProps } from './'
import { ARGENTINIAN_CELLPHONE_REGEX } from './constants/ArgentinianCellPhone'

interface PhoneProps extends ValueObjectProps {
  value: string
}

export class Phone extends ValueObject<PhoneProps> {
  private constructor(props: PhoneProps) {
    super(props)
  }

  static create(value: string): Phone {
    if (!Phone.isValid(value)) {
      throw new InvalidPhoneError(`Invalid phone number: ${value}`)
    }
    return new Phone({ value })
  }

  static isValid(phoneNumber: string): boolean {
    return ARGENTINIAN_CELLPHONE_REGEX.test(phoneNumber)
  }

  static fromPersistence(value: string): Phone {
    if (!Phone.isValid(value)) {
      throw new InvalidPhoneError(`Invalid phone number from persistence: ${value}`)
    }
    return new Phone({ value })
  }

  getNormalizedNumber(): string {
    return this.props.value
  }

  toString(): string {
    return this.props.value
  }

  toPrimitives(): string {
    return this.props.value
  }

  equals(other: Phone): boolean {
    return this.props.value === other.getNormalizedNumber()
  }
}
