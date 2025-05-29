/**
 * @interface BaseRepository
 * @description Interfaz genérica para operaciones CRUD básicas de cualquier entidad.
 * @template T La entidad de dominio que este repositorio manejará.
 * @template ID El tipo del identificador único de la entidad.
 */
export interface BaseRepository<T, ID> {
  findById(id: ID): Promise<T | null>
  save(entity: T): Promise<void>
  delete(id: ID): Promise<void>
  findAll?(): Promise<T[]> // Opcional, ya que findAll puede ser costoso o no aplicable a todas las entidades
  // add other common methods like update, findOne, etc. if needed
}
