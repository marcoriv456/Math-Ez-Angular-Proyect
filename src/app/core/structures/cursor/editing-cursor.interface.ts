import { Indexed } from '../index/indexable.structure';
import { Linkable } from '../link/linkable.interface';
import { Cursor } from './cursor.interface';

export interface EditingCursor<T extends Linkable<T>> extends Cursor<T> {
  Add(element: T): void;
  Remove(): void;
  ActiveNode: Indexed<T> | null;
}
