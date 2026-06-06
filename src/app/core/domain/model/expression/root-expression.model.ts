import { CompositeExpressionNode } from '../../abstract/composite-expression-node/composite-expression-node.interface';
import { Expression } from './expression.model';

export class RootExpression extends Expression {
  get Parent(): CompositeExpressionNode {
    throw new Error("Root expression doesn't have a parent");
  }

  override RequestFocus() { }
}
