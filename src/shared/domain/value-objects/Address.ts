import { ValueObject, ValueObjectProps } from './ValueObject'

import {
  InvalidAddressError,
  InvalidProvinceError,
  InvalidStreetNameError,
  InvalidStreetNumberError,
  InvalidZipCodeError,
} from '../errors/address'

import { InvalidArgumentError } from '../errors/generics'

import {
  ARGENTINIAN_COUNTY_REGEX,
  ARGENTINIAN_PROVINCES,
  ARGENTINIAN_ZIP_CODE_REGEX,
} from './constants'

interface AddressPropsInternal extends ValueObjectProps {
  readonly streetName: string
  readonly streetNumber: string
  readonly city: string
  readonly county?: string
  readonly zipCode?: string
  readonly province: string
  readonly floor?: string
  readonly apartment?: string
  readonly description?: string
}

export interface AddressInputProps {
  streetName: string
  streetNumber: string
  city: string
  county?: string
  zipCode?: string
  province?: string
  floor?: string
  apartment?: string
  description?: string
}

export class Address extends ValueObject<AddressPropsInternal> {
  private constructor(props: AddressPropsInternal) {
    super(props)
  }

  public static create(address: AddressInputProps): Address {
    const validatedAndNormalizedProps = Address.prepareAndValidateProps(address)
    return new Address(validatedAndNormalizedProps)
  }

  public static fromPrimitives(props: AddressPropsInternal): Address {
    const validatedAndNormalizedProps = Address.prepareAndValidateProps(props)
    return new Address(validatedAndNormalizedProps)
  }

  private static prepareAndValidateProps(addressProps: AddressInputProps): AddressPropsInternal {
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

    const normalizedPropsForValidation: AddressInputProps = {
      streetName: streetName?.trim() ?? '', // if null/undefined, convert to ''
      streetNumber: streetNumber?.trim() ?? '',
      city: city?.trim() ?? '',

      // Optional fields. If null return undefined else convert to ''
      county: county === null ? undefined : county?.trim(),
      zipCode: zipCode === null ? undefined : zipCode?.toUpperCase().trim(),
      province: province === null ? undefined : province?.trim(),
      apartment: apartment === null ? undefined : apartment?.trim(),
      floor: floor === null ? undefined : floor?.trim(),
      description: description === null ? undefined : description?.trim(),
    }

    // --- VALIDATIONS AND TRANSFORMATIONS ORDER ---

    // 1. Validate required fields that cannot be empty after trimming.
    Address.validateRequiredFields(normalizedPropsForValidation)

    // 2. format and length Validations for trimmed required fields.
    Address.validateStreetName(normalizedPropsForValidation.streetName)
    Address.validateStreetNumber(normalizedPropsForValidation.streetNumber)
    Address.validateCity(normalizedPropsForValidation.city)

    // 3. optional fields validations, where `''` should be an error.
    Address.validateCounty(normalizedPropsForValidation.county)
    Address.validateOptionalFields(
      normalizedPropsForValidation.floor,
      normalizedPropsForValidation.apartment,
      normalizedPropsForValidation.description,
    )

    // 4. Other specific validations for optional fields.
    Address.validateZipCode(normalizedPropsForValidation.zipCode)
    const normalizedProvince = Address.validateAndNormalizeProvince(
      normalizedPropsForValidation.province,
    )

    // 5. Finally, build the `AddressPropsInternal` object to be passed to the VO constructor.
    // Here we convert empty strings of optional fields to `undefined` for the internal state of the Value Object,
    // since they passed the validations.
    return {
      streetName: normalizedPropsForValidation.streetName,
      streetNumber: normalizedPropsForValidation.streetNumber,
      city: normalizedPropsForValidation.city,
      county: normalizedPropsForValidation.county,
      zipCode: normalizedPropsForValidation.zipCode,
      province: normalizedProvince,
      floor: normalizedPropsForValidation.floor,
      apartment: normalizedPropsForValidation.apartment,
      description: normalizedPropsForValidation.description,
    }
  }

  private static validateRequiredFields(props: AddressInputProps): void {
    const { streetName, streetNumber, city } = props
    // here we catch the case where any of these fields is undefined or an empty string
    if (!streetName || !streetNumber || !city) {
      throw new InvalidAddressError(
        'Address: All essential fields (streetName, streetNumber and city) are required and cannot be empty.',
      )
    }
  }

  // Validations for required fields that are not empty after trimming
  // These methods are called after validateRequiredFields to ensure the fields are not empty.
  // If you want to add more specific validations (like length, format, etc.) for these fields,
  // you can do it here.
  private static validateStreetName(streetName: string): void {
    if (streetName.length > 64) {
      throw new InvalidStreetNameError('Street name cannot exceed 64 characters.')
    }
  }

  private static validateStreetNumber(streetNumber: string): void {
    // Similar a validateStreetName, verificar la redundancia con validateRequiredFields
    if (streetNumber.length > 32) {
      // Redundante si validateRequiredFields ya lo hace
      throw new InvalidStreetNumberError('Street number cannot exceed 32 characters.')
    }
  }

  private static validateCity(city: string): void {
    if (city.length > 64) {
      throw new InvalidArgumentError('City cannot exceed 64 characters.')
    }
  }

  private static validateCounty(county?: string): void {
    if (county !== undefined && county.length === 0) {
      throw new InvalidArgumentError('County cannot be an empty string if provided.')
    }

    if (county && county.length > 64) {
      throw new InvalidArgumentError('County cannot exceed 64 characters.')
    }

    if (county && !ARGENTINIAN_COUNTY_REGEX.test(county)) {
      throw new InvalidArgumentError('County can only contain letters, numbers and spaces.')
    }
  }

  private static validateZipCode(zipCode?: string): void {
    if (zipCode !== undefined && zipCode.length > 0) {
      if (!ARGENTINIAN_ZIP_CODE_REGEX.test(zipCode)) {
        throw new InvalidZipCodeError(`Invalid ZipCode format: "${zipCode}"`)
      }
    }
  }

  private static validateAndNormalizeProvince(province?: string): string {
    if (province === undefined || province.trim() === '') {
      const defaultProvince = 'Buenos Aires'
      return defaultProvince // Default province is set to Buenos Aires
    }

    const trimmedProvince = province.trim()

    const canonicalProvince = Array.from(ARGENTINIAN_PROVINCES).find(
      p => p.toLowerCase() === trimmedProvince.toLowerCase(),
    )

    if (!canonicalProvince) {
      throw new InvalidProvinceError(trimmedProvince)
    }

    return canonicalProvince
  }

  private static validateOptionalFields(
    floor?: string,
    apartment?: string,
    description?: string,
  ): void {
    if (floor !== undefined && floor.length === 0) {
      throw new InvalidArgumentError('Floor cannot be an empty string if provided.')
    }
    if (apartment !== undefined && apartment.length === 0) {
      throw new InvalidArgumentError('Apartment cannot be an empty string if provided.')
    }
    if (description !== undefined && description.length === 0) {
      throw new InvalidArgumentError('Description cannot be an empty string if provided.')
    }
  }

  /////////////////////////////////////////////////////////////

  // Getters
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

  public getZipCode(): string | undefined {
    return this.props.zipCode
  }

  public getProvince(): string {
    return this.props.province
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

  public static isValid(address: AddressInputProps): boolean {
    try {
      Address.prepareAndValidateProps(address)
      return true
    } catch (error) {
      return false
    }
  }

  public static fromPersistence(props: AddressInputProps): Address {
    const validatedAndNormalizedProps = Address.prepareAndValidateProps(props)
    return new Address(validatedAndNormalizedProps)
  }

  public toString(): string {
    let fullAddress = `${this.props.streetName} ${this.props.streetNumber}`
    if (this.props.floor) fullAddress += `, Piso ${this.props.floor}`
    if (this.props.apartment) fullAddress += `, Depto ${this.props.apartment}`
    fullAddress += `, ${this.props.city}`
    if (this.props.county) fullAddress += `, ${this.props.county}`
    if (this.props.province) fullAddress += `, ${this.props.province}` // Province siempre será string
    if (this.props.zipCode) fullAddress += ` (${this.props.zipCode})`
    return fullAddress
  }

  public equals(vo?: ValueObject<AddressPropsInternal>): boolean {
    if (vo === null || vo === undefined || !(vo instanceof Address)) {
      return false
    }

    return (
      this.props.streetName === vo.props.streetName &&
      this.props.streetNumber === vo.props.streetNumber &&
      this.props.city === vo.props.city &&
      this.props.county === vo.props.county &&
      this.props.zipCode === vo.props.zipCode &&
      this.props.province === vo.props.province &&
      this.props.floor === vo.props.floor &&
      this.props.apartment === vo.props.apartment &&
      this.props.description === vo.props.description
    )
  }

  public toPrimitives(): AddressPropsInternal {
    return { ...this.props }
  }
}
