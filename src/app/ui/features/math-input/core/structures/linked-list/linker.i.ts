import { Link } from './link.i';

export class Linker<T> {
  public select(element: T) {
    return new LinkConnector(element);
  }
}

class LinkConnector<T> {
  constructor(_value: T) {
    this._link = new InternalLinkConnectorNode(_value);
  }
  private _link: InternalLinkConnectorNode<T>;

  public next(element: T): LinkConnector<T> {
    const nextLink = new InternalLinkConnectorNode(element);
    this._link.setNext(nextLink);
    nextLink.setPrev(this._link);
    return this;
  }

  public prev(element: T): LinkConnector<T> {
    const prevLink = new InternalLinkConnectorNode(element);
    this._link.setPrev(prevLink);
    prevLink.setNext(this._link);
    return this;
  }

  public link(): Link<T> {
    return this._link;
  }
}

class InternalLinkConnectorNode<T> implements Link<T> {
  private _next: InternalLinkConnectorNode<T> | null = null;
  private _prev: InternalLinkConnectorNode<T> | null = null;

  constructor(private _value: T) {}

  public setNext(next: InternalLinkConnectorNode<T>) {
    this._next = next;
    next._prev = this;
  }

  public setPrev(prev: InternalLinkConnectorNode<T>) {
    this._prev = prev;
    prev._next = this;
  }

  public get Next() {
    return this._next as Link<T>;
  }

  public get Prev() {
    return this._prev as Link<T>;
  }

  public get Value() {
    return this._value;
  }
}
