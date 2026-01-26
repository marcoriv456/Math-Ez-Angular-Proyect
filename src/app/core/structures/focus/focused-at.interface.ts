import { Indexed } from '../index/indexable.structure';
import { Linkable } from '../link/linkable.interface';

export interface FocusedAt<T extends Linkable<T>> {
  Focus(node: T): void;
  FocusedNode: Indexed<T> | null;
}
