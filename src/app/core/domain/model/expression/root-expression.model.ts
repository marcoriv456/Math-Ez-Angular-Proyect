import { Link } from '../../../structures/link/link.i';
import { CompositeExpressionNode } from '../../abstract/composite-expression-node.interface';
import { ExpressionNode } from '../../abstract/expression-node.interface';
import { Expression } from './expression.model';

export class RootExpression extends Expression {
  public get Parent(): CompositeExpressionNode {
    throw new Error("Root expression doesn't have a parent");
  }

  public override Select(node: Link<ExpressionNode>): void {
    this._linker.Select(node);
  }
}
