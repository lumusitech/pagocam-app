import {
  InvalidProvinceError,
  InvalidStreetNameError,
  InvalidZipCodeError,
} from '../errors/address'

import { InvalidArgumentError } from '../errors/generics'

import {
  ARGENTINIAN_PROVINCES,
  ARGENTINIAN_STREET_NAME_REGEX,
  ARGENTINIAN_ZIP_CODE_REGEX,
} from './constants'

interface AddressProps {
  readonly streetName: string
  readonly streetNumber: string
  readonly city: string
  readonly county?: string
  readonly zipCode?: string
  readonly province?: string
  readonly floor?: string
  readonly apartment?: string
  readonly description?: string
}

export class Address {
  private constructor(private readonly props: AddressProps) {}

  public static create(address: AddressProps): Address {
    const validatedAndNormalizedProps = Address.prepareAndValidateProps(address)
    return new Address(validatedAndNormalizedProps)
  }

  private static prepareAndValidateProps(addressProps: AddressProps): AddressProps {
    const {
      streetName,
      streetNumber,
      city,
      county,
      zipCode,
      province,
      apartment,
      floor,
      description,
    } = addressProps

    const normalizedProps: AddressProps = {
      ...addressProps,
      streetName: streetName.trim(),
      streetNumber: streetNumber.trim(),
      city: city.trim(),
      county: county ? county.trim() : undefined,
      zipCode: zipCode ? zipCode.toUpperCase().trim() : undefined,
      province: province ? province.trim() : '',
      apartment: apartment ? apartment.trim() : undefined,
      floor: floor ? floor.trim() : undefined,
      description: description ? description.trim() : undefined,
    }

    Address.validateRequiredFields(normalizedProps)
    Address.validateStreetName(normalizedProps.streetName)
    Address.validateStreetNumber(normalizedProps.streetNumber)
    Address.validateCity(normalizedProps.city)
    Address.validateCounty(normalizedProps.county)
    Address.validateZipCode(normalizedProps.zipCode)
    ;(normalizedProps as { province: string }).province = Address.validateAndNormalizeProvince(
      normalizedProps.province,
    )
    Address.validateOptionalFields(
      normalizedProps.floor,
      normalizedProps.apartment,
      normalizedProps.description,
    )

    return normalizedProps
  }

  private static validateRequiredFields(props: AddressProps): void {
    const { streetName, streetNumber, city } = props
    if (
      !streetName ||
      streetName.length === 0 ||
      !streetNumber ||
      streetNumber.length === 0 ||
      !city ||
      city.length === 0
    ) {
      throw new InvalidArgumentError(
        'Address: All essential fields (streetName, streetNumber and city) are required and cannot be empty.',
      )
    }
  }

  private static validateStreetName(streetName: string): void {
    if (streetName.length === 0) {
      throw new InvalidStreetNameError('Street name cannot be empty after trimming.')
    }
  }

  private static validateStreetNumber(streetNumber: string): void {
    if (streetNumber.length === 0) {
      if (ARGENTINIAN_STREET_NAME_REGEX.test(streetNumber)) {
        throw new InvalidArgumentError(
          'Street number can only contain alphanumeric characters and spaces.',
        )
      }

      throw new InvalidArgumentError('Street number cannot be empty after trimming.')
    }
  }

  private static validateCity(city: string): void {
    if (city.length === 0) {
      throw new InvalidArgumentError('City cannot be empty after trimming.')
    }
  }

  private static validateCounty(county?: string): void {
    if (county && county.length === 0) {
      throw new InvalidArgumentError('County cannot be empty after trimming.')
    }
  }

  private static validateZipCode(zipCode?: string): void {
    if (zipCode && zipCode.length < 4 && !ARGENTINIAN_ZIP_CODE_REGEX.test(zipCode)) {
      throw new InvalidZipCodeError(zipCode)
    }
  }

  private static validateAndNormalizeProvince(province?: string): string {
    const canonicalProvince = Array.from(ARGENTINIAN_PROVINCES).find(
      p => p.toLowerCase() === province?.toLowerCase(),
    )
    if (!canonicalProvince) {
      throw new InvalidProvinceError(province)
    }
    return canonicalProvince
  }

  private static validateOptionalFields(
    floor?: string,
    apartment?: string,
    description?: string,
  ): void {
    if (floor && floor.length === 0) {
      throw new InvalidArgumentError('Floor cannot be an empty string if provided.')
    }
    if (apartment && apartment.length === 0) {
      throw new InvalidArgumentError('Apartment cannot be an empty string if provided.')
    }
    if (description && description.length === 0) {
      throw new InvalidArgumentError('Description cannot be an empty string if provided.')
    }
  }

  public getStreetName(): string {
    return this.props.streetName
  }
  public getStreetNumber(): string {
    return this.props.streetNumber
  }
  public getCity(): string {
    return this.props.city
  }
  public getCounty(): string | undefined {
    return this.props.county
  }

  public getZipCode(): string | null {
    return this.props.zipCode ? this.props.zipCode : null
  }

  public getProvince(): string | null {
    return this.props.province ? this.props.province : null
  }
  public getFloor(): string | undefined {
    return this.props.floor
  }
  public getApartment(): string | undefined {
    return this.props.apartment
  }
  public getDescription(): string | undefined {
    return this.props.description
  }

  public getAddress(): Address {
    return this
  }

  public static isValid(address: AddressProps): boolean {
    try {
      Address.prepareAndValidateProps(address)
      return true
    } catch (error) {
      return false
    }
  }

  static fromPersistence(props: AddressProps): Address {
    const validatedAndNormalizedProps = Address.prepareAndValidateProps(props)
    return new Address(validatedAndNormalizedProps)
  }

  public toString(): string {
    return `${this.props.streetName} ${this.props.streetNumber}, ${this.props.city}`
  }

  public equals(other: Address): boolean {
    if (!(other instanceof Address)) return false
    return (
      this.props.streetName === other.props.streetName &&
      this.props.streetNumber === other.props.streetNumber &&
      this.props.city === other.props.city &&
      this.props.county === other.props.county &&
      this.props.zipCode === other.props.zipCode &&
      this.props.province === other.props.province &&
      this.props.floor === other.props.floor &&
      this.props.apartment === other.props.apartment &&
      this.props.description === other.props.description
    )
  }

  public toPrimitives(): AddressProps {
    return { ...this.props }
  }
}
