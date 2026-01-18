import { Cache } from '../cache/cache.structure';
import { Link } from './link.i';

export class SelectionLinker<T> {
  private _selected: InternalLinkerNode<T> | null = null;
  private _arrayCache: Cache<readonly T[]> = new Cache();

  add(element: T): SelectionLinker<T> {
    const link = new InternalLinkerNode(element);
    if (this._selected) {
      const next = this._selected.Next;
      this._selected.Next = link;
      link.Prev = this._selected;
      if (next) {
        next.Prev = link;
        link.Next = next;
      }
    }
    this._selected = link;
    this._arrayCache.invalidate();
    return this;
  }

  remove(): SelectionLinker<T> {
    if (this._selected == null) return this;

    const prev = this._selected.Prev;
    const next = this._selected.Next;

    if (prev) prev.Next = next;
    if (next) next.Prev = prev;

    this._selected = prev || next;
    this._arrayCache.invalidate();
    return this;
  }

  select(element: Link<T>): SelectionLinker<T> {
    this._selected = element as InternalLinkerNode<T>;
    return this;
  }

  selectNext(): SelectionLinker<T> {
    if (this._selected) this._selected = this._selected.Next;
    return this;
  }

  selectPrev(): SelectionLinker<T> {
    if (this._selected) this._selected = this._selected.Prev;
    return this;
  }

  getSelection(): Link<T> | null {
    return this._selected;
  }

  array(): readonly T[] {
    if (this._arrayCache.Cache) return this._arrayCache.Cache;
    if (!this._selected) return [];

    let node: Link<T> | null = this._selected;
    while (node.Prev) node = node.Prev;

    const result: T[] = [];
    while (node) {
      result.push(node.Value);
      node = node.Next;
    }

    this._arrayCache.update(result);
    return result;
  }
}

class InternalLinkerNode<T> implements Link<T> {
  private _next: InternalLinkerNode<T> | null = null;
  private _prev: InternalLinkerNode<T> | null = null;

  constructor(private _value: T) {}

  get Next(): InternalLinkerNode<T> | null {
    return this._next;
  }
  get Prev(): InternalLinkerNode<T> | null {
    return this._prev;
  }
  get Value(): T {
    return this._value;
  }

  set Next(next: InternalLinkerNode<T> | null) {
    this._next = next;
  }

  set Prev(prev: InternalLinkerNode<T> | null) {
    this._prev = prev;
  }
}
