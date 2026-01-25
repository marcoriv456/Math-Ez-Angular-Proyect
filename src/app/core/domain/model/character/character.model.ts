import { Link } from '../../../structures/link/link.i';
import { ExpressionNode } from '../../abstract/expression-node.interface';
import { Expression } from '../expression/expression.model';

export class Character implements ExpressionNode {
  private _link: Link<Character> | null = null;
  get Link() {
    if (!this._link) throw new Error('Link not set already');
    return this._link;
  }

  set Link(link: Link<Character>) {
    if (this._link) throw new Error('Link set already');
    this._link = link;
  }
  constructor(
    readonly Character: string,
    readonly Parent: Expression,
  ) {}
}
