// src/users/infrastructure/adapters/output/InMemoryUserRepository.ts

import { Email, Phone } from '../../../../../shared/domain/value-objects'
import { Client } from '../../../domain/entities/Client'
import { User } from '../../../domain/entities/UserBase'
import { UserRepositoryOutputPort } from '../../../domain/ports/output/UserRepositorytOutputPort'
import { UserId } from '../../../domain/value-objects'

// Aquí simulas tu "base de datos" en memoria
// Podrías inicializarla con algunos usuarios de prueba
const usersInMemory: User[] = [
  Client.create({
    id: '1',
    email: '1',
    name: '1',
    password: '1',
    status: 'active',
    phone: '1162623535',
    address: {
      streetName: 'Calle Falsa',
      streetNumber: '123',
      city: 'Ciudad',
      province: 'Buenos Aires',
    },
    initialLoyaltyPoints: 1,
  }),
  Client.create({
    id: '2',
    email: '2',
    name: '2',
    password: '2',
    status: 'active',
    phone: '1162623535',
    address: {
      streetName: 'Calle Falsa',
      streetNumber: '123',
      city: 'Ciudad',
      province: 'Buenos Aires',
    },
    initialLoyaltyPoints: 2,
  }),
]

export class InMemoryUserRepositoryAdapter implements UserRepositoryOutputPort {
  // Opcional: para que las pruebas puedan resetear la lista
  private users: User[] = [...usersInMemory] // Copia para no mutar el original

  constructor(initialUsers: User[] = usersInMemory) {
    this.users = [...initialUsers]
  }
  delete(id: UserId): Promise<void> {
    throw new Error('Method not implemented.')
  }
  findAll?(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  // --- Implementación de BaseRepositoryOutputPort ---
  async findById(id: UserId): Promise<User> {
    const user = this.users.find(user => user.getId().equals(id))
    if (!user) {
      throw new Error(`User with id ${id.getValue ? id.getValue() : id} not found`)
    }
    return user
  }

  async save(user: User): Promise<void> {
    throw new Error('Method not implemented.')
  }

  // --- Implementación de UserRepositoryOutputPort específica ---
  async findByEmail(email: Email): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async findByPhone(phone: Phone): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  // Método auxiliar para pruebas:
  public clear(): void {
    this.users = []
  }

  public add(user: User): void {
    this.users.push(user)
  }
}
