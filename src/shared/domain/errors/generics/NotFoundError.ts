export interface NotFoundErrorProps {
  entityName: string
  id: string
}

export class NotFoundError extends Error {
  constructor(props: NotFoundErrorProps) {
    super(`${props.entityName} with ID ${props.id} not found`)
    this.name = 'NotFoundError'

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}
