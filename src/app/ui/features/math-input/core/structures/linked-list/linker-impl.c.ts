import { Link } from './link.i';

export class SelectionLinker<T> {
  private _selected: InternalLinkerNode<T> | null = null;

  add(element: T): SelectionLinker<T> {
    const link = new InternalLinkerNode(element);
    if (this._selected == null) {
      this._selected = link;
    } else {
      const prev = this._selected.Prev;
      const next = this._selected.Next;
      if (prev) {
        prev.Next = link;
        link.Prev = prev;
      }
      if (next) {
        next.Prev = link;
        link.Next = next;
      }
    }
    return this;
  }

  remove(): SelectionLinker<T> {
    if (this._selected == null) return this;

    const prev = this._selected.Prev;
    const next = this._selected.Next;

    if (prev) prev.Next = next;
    if (next) next.Prev = prev;

    this._selected = prev || next;
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

  getSelection(): Link<T> {
    return this._selected as Link<T>;
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
