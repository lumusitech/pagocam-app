export interface CreateUserCommand {
  id: string
  email: string
  name: string
  password: string
  phone?: string
  address?: {
    street: string
    city: string
    zipCode: string
  }
}
