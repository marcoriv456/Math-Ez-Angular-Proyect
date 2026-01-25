import { Indexable } from '../index/indexable.structure';

export interface Link<T> extends Indexable<T> {
  readonly Next: Link<T> | null;
  readonly Prev: Link<T> | null;
  readonly Index: number;
  readonly Value: T;
}
