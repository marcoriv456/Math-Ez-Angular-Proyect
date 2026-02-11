import { CompositeExpressionNode } from '../../abstract/composite-expression-node.interface';
import { ExpressionNode } from '../../abstract/expression-node.interface';
import { Expression } from './expression.model';

export class RootExpression extends Expression {
  get Parent(): CompositeExpressionNode {
    throw new Error("Root expression doesn't have a parent");
  }

  override Select(node: ExpressionNode): void {
    this._linker.Select(node.Link);
  }

  override Focus(node: CompositeExpressionNode) {
    this._focusedNode = node.Link;
    this.Select(node);
  }
}
