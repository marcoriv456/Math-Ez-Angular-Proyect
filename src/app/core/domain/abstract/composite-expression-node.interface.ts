import { ClosedLinker } from '../../structures/link/closed-linker.structure';
import { Link } from '../../structures/link/link.i';
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

  get ActiveNodeIndex() {
    return this._focusedExpression.ActiveNodeIndex;
  }

  get FocusedExpressionIndex(): number | null {
    const focusedExpression = this._expressionLinker.Selection;
    if (focusedExpression) return focusedExpression.Index;
    return null;
  }

  private _parent: Expression | null = null;
  private _link: Link<CompositeExpressionNode> | null = null;
  protected abstract _expressionLinker: ClosedLinker<Expression>;

  protected get _focusedExpression(): Expression {
    if (!this._expressionLinker.Selection)
      throw new Error('Not selected expression.');
    return this._expressionLinker.Selection.Value;
  }

  abstract Add(node: ExpressionNode): void;
  abstract Remove(): void;

  Select(expression: Link<Expression>): void {
    this._expressionLinker.Select(expression);
    this.Parent.Focus(this);
  }

  MoveForward() {
    this._focusedExpression.SelectNext();
  }

  MoveBackward() {
    this._focusedExpression.SelectPrev();
  }

  MoveTail() {
    this._focusedExpression.SelectTail();
  }

  MoveHead() {
    this._focusedExpression.SelectLast();
  }
}
