import { Log } from '../../../debug/log-node.debug.helper';
import { CompositeExpressionNode } from '../../abstract/composite-expression-node/composite-expression-node.interface';
import { ExpressionNode } from '../../abstract/expression-node.interface';
import { Expression } from './expression.model';

export class ChildExpression extends Expression {
  override readonly Parent: CompositeExpressionNode;
  constructor(Parent: CompositeExpressionNode) {
    super();
    this.Parent = Parent;
  }

  override SelectPrev(): void {
    super.SelectPrev();
    Log(this._linker);
  }

  override SelectNext(): void {
    super.SelectNext();
    Log(this._linker);
  }

  override Add(element: ExpressionNode): void {
    super.Add(element);
    Log(this._linker);
  }

  override Remove(): void {
    super.Remove();
    Log(this._linker);
  }
}
