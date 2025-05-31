import { ValueObject, ValueObjectProps } from './'

import {
  InvalidProvinceError,
  InvalidStreetNameError,
  InvalidZipCodeError,
} from '../errors/address'

// Importar errores genéricos
import { InvalidArgumentError } from '../errors/generics'

import { ARGENTINIAN_PROVINCES, ARGENTINIAN_ZIP_CODE_REGEX } from './constants'

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

    // Normalize props
    const normalizedProps: AddressInputProps = {
      streetName: streetName ? streetName.trim() : '',
      streetNumber: streetNumber ? streetNumber.trim() : '',
      city: city ? city.trim() : '',
      county: county ? county.trim() : undefined,
      zipCode: zipCode ? zipCode.toUpperCase().trim() : undefined,
      province: province ? province.trim() : undefined,
      apartment: apartment ? apartment.trim() : undefined,
      floor: floor ? floor.trim() : undefined,
      description: description ? description.trim() : undefined,
    }

    Address.validateRequiredFields(normalizedProps)
    Address.validateStreetName(normalizedProps.streetName)
    Address.validateStreetNumber(normalizedProps.streetNumber)
    Address.validateCity(normalizedProps.city)
    Address.validateCounty(normalizedProps.county)
    Address.validateOptionalFields(
      normalizedProps.floor,
      normalizedProps.apartment,
      normalizedProps.description,
    )

    Address.validateZipCode(normalizedProps.zipCode)
    const normalizedProvince = Address.validateAndNormalizeProvince(normalizedProps.province)

    return {
      streetName: normalizedProps.streetName,
      streetNumber: normalizedProps.streetNumber,
      city: normalizedProps.city,
      county: normalizedProps.county === '' ? undefined : normalizedProps.county,
      zipCode: normalizedProps.zipCode === '' ? undefined : normalizedProps.zipCode,
      province: normalizedProvince,
      floor: normalizedProps.floor === '' ? undefined : normalizedProps.floor,
      apartment: normalizedProps.apartment === '' ? undefined : normalizedProps.apartment,
      description: normalizedProps.description === '' ? undefined : normalizedProps.description,
    }
  }

  private static validateRequiredFields(props: AddressInputProps): void {
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
      throw new InvalidArgumentError('Street number cannot be empty after trimming.')
    }
  }

  private static validateCity(city: string): void {
    if (city.length === 0) {
      throw new InvalidArgumentError('City cannot be empty after trimming.')
    }
  }

  private static validateCounty(county?: string): void {
    if (county !== undefined && county.length === 0) {
      throw new InvalidArgumentError('County cannot be an empty string if provided.')
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

      if (!Array.from(ARGENTINIAN_PROVINCES).includes(defaultProvince)) {
        console.error('Default province "Buenos Aires" not found in ARGENTINIAN_PROVINCES.')
        throw new Error('Configuration Error: Default province is invalid.')
      }
      return defaultProvince
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
    // Primero, comprueba si el objeto es nulo, indefinido o no es una instancia de Address
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
