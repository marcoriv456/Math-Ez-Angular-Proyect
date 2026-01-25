import { Link } from './link.i';

export class SelectionLinker<T> {
  private _selected: InternalLinkerNode<T> | null = null;
  private _array: InternalLinkerNode<T>[] = [];

  public get IsAtLast(): boolean {
    return !this._selected?.Next;
  }

  public get IsAtTail(): boolean {
    if (!this._selected) return true;
    return this._selected.IsPlaceholder;
  }

  Add(element: T): Link<T> {
    if (this._selected && this._selected.IsPlaceholder) {
      this._selected.Value = element;
      this._array.splice(0, 0, this._selected);
      this.SyncIndexes();
      return this._selected;
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

    this._array.splice(this._selected ? this._selected.Index + 1 : 0, 0, link);
    this.SyncIndexes();
    this._selected = link;

    return this._selected;
  }

  Remove(): Link<T> | null {
    if (this._selected == null || this._selected.IsPlaceholder) return null;
    const prev = this._selected.Prev;
    const next = this._selected.Next;

    if (prev) prev.Next = next;
    if (next) next.Prev = prev;

    this._array.splice(this._selected.Index, 1);
    this.SyncIndexes();

    const removed = this._selected;
    this._selected = prev || next;

    return removed;
  }

  Select(element: Link<T>): SelectionLinker<T> {
    console.log(element);
    this._selected = element as InternalLinkerNode<T>;
    return this;
  }

  SelectNext(): SelectionLinker<T> {
    if (this._selected && this._selected.Next)
      this._selected = this._selected.Next;
    return this;
  }

  SelectPrev(): SelectionLinker<T> {
    if (!this._selected) return this;

    if (!this._selected.Prev && !this._selected.IsPlaceholder)
      this.selectEdgePlaceholder();
    else if (this._selected.Prev) this._selected = this._selected.Prev;

    return this;
  }

  SelectTail(): SelectionLinker<T> {
    this.selectEdgePlaceholder();
    return this;
  }

  SelectLast(): SelectionLinker<T> {
    this._selected = this.last() as InternalLinkerNode<T>;
    return this;
  }

  get Selection(): Link<T> | null {
    if (!this._selected) return null;
    return this._selected.IsPlaceholder ? null : this._selected;
  }

  get AsArray(): readonly T[] {
    return this._array.map((el) => el.Value);
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

  private SyncIndexes() {
    this._array.forEach((el, i) => (el.Index = i));
  }
}

class InternalLinkerNode<T> implements Link<T> {
  private _next: InternalLinkerNode<T> | null = null;
  private _prev: InternalLinkerNode<T> | null = null;
  private _value: T | null = null;
  private _index: number | null = null;

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
      throw new Error(`Value not found. Node is a placeholder.`);
    return this._value;
  }

  get Index(): number {
    if (this._index == null)
      throw new Error(`Index not found. Node is a placeholder.`);
    return this._index;
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

  set Index(index: number) {
    this._index = index;
  }
}
