import { Linkable } from '../../structures/link/linkable.interface';
import { Parentable } from '../../structures/parentable/parentable.interface';
import { Expression } from '../model/expression/expression.model';

export interface ExpressionNode
  extends Linkable<ExpressionNode>, Parentable<Expression> {}
