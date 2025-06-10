//? 1. Defines comparison operators
type FilterOperator = '=' | '!=' | '>' | '<' | '>=' | '<=' | 'like' | 'in'

//? 2. Defines an individual filter condition
//* T is the type of the entity
//* k extends from keyof T to ensure that the property exists in T
//* V is the type of the property in T
export type FilterCriterion<T, K extends keyof T = keyof T> = {
  property: K //* k property is a key of T
  operator?: FilterOperator //* The comparison operator (example: '=', '>', 'like').
  value: T[K] //* Value to compare (type inference from the property)
}

//? 3. Defines a type for a complex AND/OR query
export type FilterCondition<T> =
  | FilterCriterion<T>
  | {
      and?: Array<FilterCondition<T>>
      or?: Array<FilterCondition<T>>
    }

export interface Repository<T, ID> {
  save(entity: T): Promise<void>
  findById(id: ID): Promise<T | null>
  delete(id: ID): Promise<void>
  findAll(): Promise<T[]>

  //? 4. Matching with a more explicit criterion
  matching?: (conditions: FilterCondition<T> | Array<FilterCondition<T>>) => Promise<T[]>
}

//! Example uses

//? Búsqueda simple por igualdad:
// userRepository.matching({ property: 'email', value: Email.create('test@example.com') });

//? Búsqueda con operador:
// userRepository.matching({ property: 'age', operator: '>', value: 18 });

//? Búsqueda combinada (AND):
// userRepository.matching(and: [
//   { property: 'status', value: UserStatus.create('active') },
//   { property: 'role', value: UserRole.create('client') }
// ]);

//? Búsqueda compleja (AND/OR):
// userRepository.matching({
//   and: [
//     { property: 'status', value: UserStatus.create('active') },
//     { or: [
//         { property: 'role', value: UserRole.create('admin') },
//         { property: 'role', value: UserRole.create('client') }
//       ]
//     }
//   ]
// });
