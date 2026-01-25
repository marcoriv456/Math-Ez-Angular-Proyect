import { Link } from '../../structures/link/link.i';
import { SelectionLinker } from '../../structures/link/selection-linker.structure';
import { Expression } from '../model/expression/expression.model';
import { ExpressionNode } from './expression-node.interface';

export abstract class CompositeExpressionNode implements ExpressionNode {
  get Link() {
    if (!this._link) throw new Error('Not linked already.');
    return this._link;
  }

  set Link(link: Link<CompositeExpressionNode>) {
    if (this._link) throw new Error('Link already set');
    this._link = link;
  }

  get Parent() {
    if (!this._parent) throw new Error('Parent not set already.');
    return this._parent;
  }

  set Parent(parent: Expression) {
    if (this._parent) throw new Error('Parent already set');
    this._parent = parent;
  }

  private _parent: Expression | null = null;
  private _link: Link<CompositeExpressionNode> | null = null;
  private _expressionLinker = new SelectionLinker<Expression>();

  private get _selectedExpression() {
    if (this._expressionLinker.Selection)
      return this._expressionLinker.Selection.Value;
    throw new Error('Not selected expression.');
  }

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
