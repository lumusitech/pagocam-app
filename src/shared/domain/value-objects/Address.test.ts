import { InvalidProvinceError, InvalidZipCodeError } from '../errors/address'
import { InvalidArgumentError } from '../errors/generics'
import { Address } from './Address'

describe('Address Value Object', () => {
  it('should create a valid Address with all required properties', () => {
    const addressProps = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'CABA',
      province: 'Buenos Aires',
      zipCode: 'C1084AAJ',
      county: 'Comuna 1',
      floor: '1',
      apartment: 'A',
      description: 'Near the park',
    }
    const address = Address.create(addressProps)

    expect(address).toBeInstanceOf(Address)
    expect(address.getStreetName()).toBe('Rivadavia')
    expect(address.getStreetNumber()).toBe('100')
    expect(address.getCity()).toBe('CABA')
    expect(address.getProvince()).toBe('Buenos Aires')
    expect(address.getZipCode()).toBe('C1084AAJ')
    expect(address.getCounty()).toBe('Comuna 1')
    expect(address.getFloor()).toBe('1')
    expect(address.getApartment()).toBe('A')
    expect(address.getDescription()).toBe('Near the park')
  })

  it('should be equal to another to string Address with ALL properties', () => {
    const addressProps = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'CABA',
      province: 'Buenos Aires',
      zipCode: 'C1084AAJ',
      county: 'Comuna 1',
      floor: '1',
      apartment: 'A',
      description: 'Near the park',
    }
    const address = Address.create(addressProps)
    const addressToStringResult = address.toString()
    expect(addressToStringResult).toBe(
      'Rivadavia 100, Piso 1, Depto A, CABA, Comuna 1, Buenos Aires (C1084AAJ)',
    )
  })

  it('should be equal to another to string Address with only required properties', () => {
    const addressProps = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'CABA',
    }
    const address = Address.create(addressProps)
    const addressToStringResult = address.toString()
    expect(addressToStringResult).toBe('Rivadavia 100, CABA, Buenos Aires')
  })

  it('should throw an error for invalid streetName', () => {
    const invalidProps = {
      streetName: '', // Invalid
      streetNumber: '100',
      city: 'CABA',
      province: 'Buenos Aires',
    }
    expect(() => Address.create(invalidProps)).toThrow(InvalidArgumentError)
    expect(() => Address.create(invalidProps)).toThrow(
      'Address: All essential fields (streetName, streetNumber and city) are required and cannot be empty.',
    )
  })

  it('should throw an error for invalid streetNumber', () => {
    const invalidProps = {
      streetName: 'Rivadavia',
      streetNumber: '', // Invalid
      city: 'CABA',
      province: 'Buenos Aires',
    }
    expect(() => Address.create(invalidProps)).toThrow(InvalidArgumentError)
    expect(() => Address.create(invalidProps)).toThrow(
      'Address: All essential fields (streetName, streetNumber and city) are required and cannot be empty.',
    )
  })

  it('should throw an error for invalid city', () => {
    const invalidProps = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: '', // Invalid
      province: 'Buenos Aires',
    }
    expect(() => Address.create(invalidProps)).toThrow(InvalidArgumentError)
    expect(() => Address.create(invalidProps)).toThrow(
      'Address: All essential fields (streetName, streetNumber and city) are required and cannot be empty.',
    )
  })

  it('should throw an error for invalid city that exceed 64 characters', () => {
    const invalidProps = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'A'.repeat(65), // Invalid becasue exceeds 64 characters
      province: 'Buenos Aires',
    }
    expect(() => Address.create(invalidProps)).toThrow(InvalidArgumentError)
    expect(() => Address.create(invalidProps)).toThrow('City cannot exceed 64 characters.')
  })

  it('should use default province if not provided', () => {
    const addressProps = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'CABA',
      // province missing or empty
    }
    const address = Address.create(addressProps)
    expect(address.getProvince()).toBe('Buenos Aires') // Verifica el default
  })

  it('should throw an error for an unrecognized province if provided', () => {
    const invalidProps = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'CABA',
      province: 'InvalidProvince', // Invalid
    }
    expect(() => Address.create(invalidProps)).toThrow(InvalidProvinceError)
    expect(() => Address.create(invalidProps)).toThrow('InvalidProvince')
  })

  it('should throw an error if county is too long', () => {
    const invalidProps = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'CABA',
      province: 'Buenos Aires',
      county: 'A'.repeat(65), // with limit of 64 characters
    }
    expect(() => Address.create(invalidProps)).toThrow(InvalidArgumentError)
  })

  it('should throw an error if floor is empty', () => {
    const invalidProps = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'CABA',
      province: 'Buenos Aires',
      floor: '', // Invalid
    }
    expect(() => Address.create(invalidProps)).toThrow(InvalidArgumentError)
    expect(() => Address.create(invalidProps)).toThrow(
      'Floor cannot be an empty string if provided.',
    )
  })

  it('should throw an error if apartment is empty', () => {
    const invalidProps = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'CABA',
      province: 'Buenos Aires',
      apartment: '', // Invalid
    }
    expect(() => Address.create(invalidProps)).toThrow(InvalidArgumentError)
    expect(() => Address.create(invalidProps)).toThrow(
      'Apartment cannot be an empty string if provided.',
    )
  })

  it('should throw an error if description is empty', () => {
    const invalidProps = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'CABA',
      province: 'Buenos Aires',
      description: '', // Invalid
    }
    expect(() => Address.create(invalidProps)).toThrow(InvalidArgumentError)
    expect(() => Address.create(invalidProps)).toThrow(
      'Description cannot be an empty string if provided.',
    )
  })

  // Tests para fromPrimitives y toPrimitives
  it('should correctly convert to and from primitives', () => {
    const originalProps = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'CABA',
      province: 'Buenos Aires',
      zipCode: 'C1084AAJ',
    }
    const address = Address.create(originalProps)
    const primitives = address.toPrimitives()

    expect(primitives.streetName).toBe('Rivadavia')
    // ... otras aserciones para los primitivos

    const reconstructedAddress = Address.fromPrimitives(primitives)
    expect(reconstructedAddress.equals(address)).toBe(true)
    expect(reconstructedAddress).toBeInstanceOf(Address)
  })

  it('should correctly convert to and from primitives including optional fields', () => {
    const originalProps = {
      streetName: 'Libertador',
      streetNumber: '2000',
      city: 'Martinez',
      province: 'Buenos Aires',
      zipCode: 'B1640DAB', // or 1615
      county: 'San Isidro',
      floor: '5',
      apartment: 'B',
      description: 'Near train station',
    }
    const address = Address.create(originalProps)
    const primitives = address.toPrimitives()

    expect(primitives).toEqual(originalProps) // Comparación directa si todos los campos son idénticos

    const reconstructedAddress = Address.fromPrimitives(primitives)
    expect(reconstructedAddress.equals(address)).toBe(true)
    expect(reconstructedAddress).toBeInstanceOf(Address)
  })

  it('should correctly convert to and from primitives when optional fields are missing', () => {
    const originalProps = {
      streetName: 'Diagonal Norte',
      streetNumber: '900',
      city: 'CABA',
      province: 'Buenos Aires',
      // No optional fields here
    }
    const address = Address.create(originalProps)
    const primitives = address.toPrimitives()

    // Optional fileds should not be present in primitives
    expect(primitives.zipCode).toBeUndefined()
    expect(primitives.county).toBeUndefined()

    const reconstructedAddress = Address.fromPrimitives(primitives)
    expect(reconstructedAddress.equals(address)).toBe(true)
  })

  it('should return true for two Address objects with the same properties', () => {
    const props1 = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'CABA',
      province: 'Buenos Aires',
    }
    const address1 = Address.create(props1)
    const address2 = Address.create(props1) // Same props

    expect(address1.equals(address2)).toBe(true)
  })

  it('should return false for two Address objects with different street names', () => {
    const props1 = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'CABA',
      province: 'Buenos Aires',
    }
    const address1 = Address.create(props1)
    const props2 = {
      streetName: 'Corrientes',
      streetNumber: '100',
      city: 'CABA',
      province: 'Buenos Aires',
    }
    const address2 = Address.create(props2)

    expect(address1.equals(address2)).toBe(false)
  })

  it('should return false for two Address objects with different cities', () => {
    const props1 = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'CABA',
      province: 'Buenos Aires',
    }
    const address1 = Address.create(props1)
    const props2 = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'La Plata',
      province: 'Buenos Aires',
    }
    const address2 = Address.create(props2)

    expect(address1.equals(address2)).toBe(false)
  })

  it('should return false when comparing with null or undefined', () => {
    const address = Address.create({
      streetName: 'Test',
      streetNumber: '1',
      city: 'Test City',
      province: 'Buenos Aires',
    })
    expect(address.equals(null as any)).toBe(false)
    expect(address.equals(undefined as any)).toBe(false)
  })

  it('should return false when comparing with an object that is not an Address instance', () => {
    const address = Address.create({
      streetName: 'Test',
      streetNumber: '1',
      city: 'Test City',
      province: 'Buenos Aires',
    })
    expect(address.equals({} as any)).toBe(false)
    expect(address.equals({ getStreetName: () => 'Test' } as any)).toBe(false)
  })

  it('should throw an error for an invalid zipCode format (CPA)', () => {
    const invalidProps = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'CABA',
      province: 'Buenos Aires',
      zipCode: 'INVALIDO', // No cumple A####AAA
    }
    expect(() => Address.create(invalidProps)).toThrow(InvalidZipCodeError)
    expect(() => Address.create(invalidProps)).toThrow(
      `Invalid ZipCode format: "${invalidProps.zipCode}"`,
    )
  })

  it('should throw an error for an invalid zipCode format (4 digits)', () => {
    const invalidProps = {
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'CABA',
      province: 'Buenos Aires',
      zipCode: '123', // No cumple ####
    }
    expect(() => Address.create(invalidProps)).toThrow(InvalidZipCodeError)
    expect(() => Address.create(invalidProps)).toThrow(
      `Invalid ZipCode format: "${invalidProps.zipCode}"`,
    )
  })

  it('should create a valid Address with a 4-digit zipCode', () => {
    const address = Address.create({
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'CABA',
      province: 'Buenos Aires',
      zipCode: '1615', // Grand Bourg!
    })
    expect(address.getZipCode()).toBe('1615')
  })

  it('should create a valid Address with a CPA zipCode', () => {
    const address = Address.create({
      streetName: 'Rivadavia',
      streetNumber: '100',
      city: 'CABA',
      province: 'Buenos Aires',
      zipCode: 'B1615DAB',
    })
    expect(address.getZipCode()).toBe('B1615DAB')
  })

  it('should return false if only county is different', () => {
    const baseProps = { streetName: 'A', streetNumber: '1', city: 'C', province: 'Buenos Aires' }
    const address1 = Address.create({ ...baseProps, county: 'County A' })
    const address2 = Address.create({ ...baseProps, county: 'County B' })
    expect(address1.equals(address2)).toBe(false)
  })

  it('should return false if one floor is present and the other is undefined', () => {
    const baseProps = { streetName: 'A', streetNumber: '1', city: 'C', province: 'Buenos Aires' }
    const address1 = Address.create({ ...baseProps, floor: '1' })
    const address2 = Address.create(baseProps) // floor is undefined
    expect(address1.equals(address2)).toBe(false)
  })
})
