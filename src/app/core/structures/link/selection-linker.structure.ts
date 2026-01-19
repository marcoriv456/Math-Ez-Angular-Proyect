import { first } from 'rxjs';
import { Cache } from '../cache/cache.structure';
import { Link } from './link.i';

export class SelectionLinker<T> {
  private _selected: InternalLinkerNode<T> | null = null;
  private _arrayCache: Cache<readonly T[]> = new Cache();

  add(element: T): SelectionLinker<T> {
    if (this._selected && this._selected.IsPlaceholder) {
      this._selected.Value = element;
      this._arrayCache.invalidate();
      return this;
    }

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
    if (this._selected && this._selected.Next)
      this._selected = this._selected.Next;
    return this;
  }

  selectPrev(): SelectionLinker<T> {
    if (!this._selected) return this;

    if (!this._selected.Prev && !this._selected.IsPlaceholder)
      this.selectEdgePlaceholder();
    else if (this._selected.Prev) this._selected = this._selected.Prev;

    return this;
  }

  selectTail(): SelectionLinker<T> {
    this.selectEdgePlaceholder();
    return this;
  }

  selectLast(): SelectionLinker<T> {
    this._selected = this.last() as InternalLinkerNode<T>;
    return this;
  }

  getSelection(): Link<T> | null {
    if (!this._selected) return null;
    return this._selected.IsPlaceholder ? null : this._selected;
  }

  array(): readonly T[] {
    if (this._arrayCache.Cache) return this._arrayCache.Cache;
    if (!this._selected) return [];
    let node = this.first();

    const result: T[] = [];

    while (node) {
      if (!node.IsPlaceholder) result.push(node.Value);
      node = node.Next;
    }

    this._arrayCache.update(result);
    return result;
  }

  private selectEdgePlaceholder() {
    const placeholder = new InternalLinkerNode<T>(null);
    const first = this.first();
    placeholder.Next = first;
    this._selected = placeholder;
  }

  private last(): Link<T> | null {
    if (!this._selected) return null;
    let node = this._selected;

    while (node.Next) node = node.Next;

    return node;
  }
  private first(): InternalLinkerNode<T> | null {
    if (!this._selected) return null;
    let node: InternalLinkerNode<T> = this._selected;

    while (node.Prev) node = node.Prev;

    return node;
  }
}

class InternalLinkerNode<T> implements Link<T> {
  private _next: InternalLinkerNode<T> | null = null;
  private _prev: InternalLinkerNode<T> | null = null;
  private _value: T | null = null;

  constructor(value: T | null) {
    if (value) this._value = value;
  }

  get Next(): InternalLinkerNode<T> | null {
    return this._next;
  }
  get Prev(): InternalLinkerNode<T> | null {
    return this._prev;
  }
  get Value(): T {
    if (!this._value)
      throw new Error(
        `Value not found. ${this.IsPlaceholder ? 'Node is a placeholder.' : ''}`,
      );
    return this._value;
  }
  get IsPlaceholder() {
    return this._value == null;
  }

  set Next(next: InternalLinkerNode<T> | null) {
    this._next = next;
  }

  set Prev(prev: InternalLinkerNode<T> | null) {
    this._prev = prev;
  }

  set Value(value: T) {
    this._value = value;
  }
}
