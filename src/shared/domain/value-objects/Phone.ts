import { InvalidPhoneError } from '../errors/InvalidPhoneError'
import { ARGENTINIAN_CELLPHONE_REGEX } from './constants/ArgentinianCellPhone'

export class Phone {
  private readonly phoneNumber: string

  private constructor(phoneNumber: string) {
    this.phoneNumber = phoneNumber
  }

  static create(phoneNumber: string): Phone {
    if (!Phone.isValid(phoneNumber)) {
      throw new InvalidPhoneError(`Invalid phone number: ${phoneNumber}`)
    }
    return new Phone(phoneNumber)
  }

  static isValid(phoneNumber: string): boolean {
    return ARGENTINIAN_CELLPHONE_REGEX.test(phoneNumber)
  }

  static fromPersistence(phoneNumber: string): Phone {
    if (!Phone.isValid(phoneNumber)) {
      throw new InvalidPhoneError(`Invalid phone number from persistence: ${phoneNumber}`)
    }
    return new Phone(phoneNumber)
  }

  getNormalizedNumber(): string {
    return this.phoneNumber
  }

  toString(): string {
    return this.phoneNumber
  }

  equals(other: Phone): boolean {
    return this.phoneNumber === other.getNormalizedNumber()
  }
}
