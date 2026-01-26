import { Linkable } from '../link/linkable.interface';

export interface Cursor<T extends Linkable<T>> {
  SelectNext(): void;
  SelectPrev(): void;
  SelectLast(): void;
  SelectTail(): void;
  Select(e: T): void;
  HasNext: boolean;
  HasPrev: boolean;
}
