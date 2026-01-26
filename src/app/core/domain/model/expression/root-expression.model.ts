import { Log } from '../../../debug/log-node.debug.helper';
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
    console.log('node focused: ', node);
    Log(this._linker);
    this._focusedNode = node.Link;
  }

  override SelectPrev(): void {
    super.SelectPrev();
  }

  override SelectNext(): void {
    super.SelectNext();
    // Log(this._linker);
  }

  override Add(element: ExpressionNode): void {
    super.Add(element);
    // Log(this._linker);
  }

  override Remove(): void {
    super.Remove();
    // Log(this._linker);
  }
}
