import { Link } from '../../../structures/link/link.i';
import { ExpressionNode } from '../../abstract/expression-node.interface';
import { Expression } from '../expression/expression.model';

export class Character implements ExpressionNode {
  get Link() {
    if (!this._link) throw new Error('Link not set already');
    return this._link;
  }

  set Link(link: Link<Character>) {
    if (this._link) throw new Error('Link set already');
    this._link = link;
  }

  get Parent() {
    if (!this._parent) throw new Error('Parent not set already.');
    return this._parent;
  }

  set Parent(parent: Expression) {
    if (this._parent) throw new Error('Parent already set');
    this._parent = parent;
  }

  private _link: Link<Character> | null = null;
  private _parent: Expression | null = null;

  constructor(readonly Character: string) {}
}
