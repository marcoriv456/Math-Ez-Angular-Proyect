import { Link } from '../../structures/link/link.i';
import { SelectionLinker } from '../../structures/link/selection-linker.structure';
import { Expression } from '../model/expression/expression.model';
import { ExpressionNode } from './expression-node.interface';

export abstract class CompositeExpressionNode implements ExpressionNode {
  get Link() {
    if (!this._link) throw new Error('Not linked already.');
    return this._link;
  }

  private _link: Link<CompositeExpressionNode> | null = null;
  private _expressionLinker = new SelectionLinker<Expression>();

  private get _selectedExpression() {
    if (this._expressionLinker.Selection)
      return this._expressionLinker.Selection.Value;
    throw new Error('Not selected expression.');
  }

  constructor(readonly Parent: Expression) {}

  abstract Add(node: ExpressionNode): void;
  abstract Remove(): void;

  Select(expression: Link<Expression>): void {
    this._expressionLinker.Select(expression);
    this.Parent.Focus(this);
  }

  MoveForward() {
    this._selectedExpression.SelectNext();
  }

  MoveBackward() {
    this._selectedExpression.SelectPrev();
  }

  MoveTail() {
    this._selectedExpression.SelectTail();
  }

  MoveHead() {
    this._selectedExpression.SelectLast();
  }
}
