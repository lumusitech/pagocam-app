export interface IdGenerator {
  generate(): string
  fromString(id: string): string
  isValid(id: string): boolean
}
