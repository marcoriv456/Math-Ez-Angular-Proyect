import { Indexed } from '../index/indexable.structure';

export interface Link<T> extends Indexed<T> {
  readonly Next: Link<T> | null;
  readonly Prev: Link<T> | null;
  readonly Index: number;
  readonly Value: T;
}
