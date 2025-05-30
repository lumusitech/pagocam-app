import { AndSpecification } from './AndSpecification';
import { NotSpecification } from './NotSpecification';
import { Specification } from './Specification';

export class OrSpecification<T> implements Specification<T> {
  constructor(private readonly left: Specification<T>, private readonly right: Specification<T>) {}

  isSatisfiedBy(candidate: T): boolean {
    return this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate);
  }

  and(other: Specification<T>): Specification<T> {
    return new AndSpecification(this, other);
  }

  or(other: Specification<T>): Specification<T> {
    return new OrSpecification(this, other);
  }

  not(): Specification<T> {
    return new NotSpecification(this);
  }
}