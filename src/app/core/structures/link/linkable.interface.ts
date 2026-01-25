import { Link } from './link.i';

export interface Linkable<T> {
  readonly Link: Link<T>;
}
