/**
 * @interface BaseRepository
 * @description Interfaz genérica para operaciones CRUD básicas de cualquier entidad.
 * @template T La entidad de dominio que este repositorio manejará.
 * @template ID El tipo del identificador único de la entidad.
 */
export interface BaseRepositoryOutputPort<T, ID> {
  findById(id: ID): Promise<T | null>
  save(entity: T): Promise<void>
  update(entity: T): Promise<void>
  softDelete(id: ID): Promise<void>
  delete(id: ID): Promise<void>
  findAll?(): Promise<T[]>
}
