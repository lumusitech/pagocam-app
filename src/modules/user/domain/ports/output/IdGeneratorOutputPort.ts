export interface IdGeneratorOutputPort {
  generate(): string
  fromString(id: string): string
  isValid(id: string): boolean
}
