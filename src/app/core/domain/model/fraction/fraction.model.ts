import { CompositeExpressionNode } from '../../abstract/composite-expression-node.interface';
import { ExpressionNode } from '../../abstract/expression-node.interface';
import { ChildExpression } from '../expression/child-expression.model';
import { Expression } from '../expression/expression.model';

export class Fraction extends CompositeExpressionNode {
  Numerator: Expression;
  Denominator: Expression;
  constructor() {
    super();
    this.Numerator = new ChildExpression(this);
    this.Denominator = new ChildExpression(this);
  }

  override Add(node: ExpressionNode): void {}

  override Remove(): void {}
}
