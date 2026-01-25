import { CompositeExpressionNode } from '../../abstract/composite-expression-node.interface';
import { Expression } from './expression.model';

export class ChildExpression extends Expression {
  constructor(override readonly Parent: CompositeExpressionNode) {
    super();
  }
}
