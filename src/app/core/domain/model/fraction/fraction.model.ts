import { ClosedLinker } from '../../../structures/link/closed-linker.structure';
import { CompositeExpressionNode } from '../../abstract/composite-expression-node.interface';
import { ExpressionNode } from '../../abstract/expression-node.interface';
import { ChildExpression } from '../expression/child-expression.model';
import { Expression } from '../expression/expression.model';

export class Fraction extends CompositeExpressionNode {
  Numerator: Expression;
  Denominator: Expression;
  protected override _expressionLinker: ClosedLinker<Expression>;
  constructor() {
    super();
    this.Numerator = new ChildExpression(this);
    this.Denominator = new ChildExpression(this);
    this._expressionLinker = new ClosedLinker([
      this.Numerator,
      this.Denominator,
    ]);
    this._expressionLinker.SelectFirst();
  }

  override Add(node: ExpressionNode): void {
    this._focusedExpression.Add(node);
  }

  override Remove(): void {
    this._focusedExpression.Remove();
  }
}
