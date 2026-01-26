import { EditingCursor } from '../../structures/cursor/editing-cursor.interface';
import { FocusedAt } from '../../structures/focus/focused-at.interface';
import { Indexed } from '../../structures/index/indexable.structure';
import { ClosedLinker } from '../../structures/link/closed-linker.structure';
import { Link } from '../../structures/link/link.i';
import { Expression } from '../model/expression/expression.model';
import { ExpressionNode } from './expression-node.interface';

export abstract class CompositeExpressionNode
  implements
  ExpressionNode,
  EditingCursor<ExpressionNode>,
  FocusedAt<Expression> {
  // Linkable
  get Link() {
    if (!this._link) throw new Error('Not linked already.');
    return this._link;
  }
  set Link(link: Link<CompositeExpressionNode>) {
    if (this._link) throw new Error('Link already set');
    this._link = link;
  }
  private _link: Link<CompositeExpressionNode> | null = null;

  // Parentable
  get Parent() {
    if (!this._parent) throw new Error('Parent not set already.');
    return this._parent;
  }
  set Parent(parent: Expression) {
    if (this._parent) throw new Error('Parent already set');
    this._parent = parent;
  }
  private _parent: Expression | null = null;

  //  FocusedAt
  protected abstract _expressionLinker: ClosedLinker<Expression>;
  get FocusedNode(): Indexed<Expression> {
    const focused = this._expressionLinker.Selection;
    if (!focused) throw new Error('Not focused node found');
    return focused;
  }

  Add(node: ExpressionNode): void {
    this.FocusedNode.Value.Add(node);
  }

  Remove(): void {
    this.FocusedNode.Value.Remove();
  }

  // EditingCursor

  get ActiveNode(): Indexed<ExpressionNode> | null {
    return this.FocusedNode.Value.ActiveNode;
  }

  //FocusedAt
  Focus(node: Expression): void {
    this._expressionLinker.Select(node.Link);
    this.Parent.Focus(this);
  }

  Select(e: ExpressionNode): void {
    //TODO: segregate another interface to implement a
    //behavior where no random element can be picked by its link,
    //so only direct expression can implement it
    //(therefore, removing this method from this class)
  }

  SelectNext() {
    this.FocusedNode.Value.SelectNext();
  }

  get HasNext() {
    return this.FocusedNode.Value.HasNext;
  }

  SelectPrev() {
    this.FocusedNode.Value.SelectPrev();
  }

  get HasPrev() {
    return this.FocusedNode.Value.HasPrev;
  }

  SelectTail() {
    this.FocusedNode.Value.SelectTail();
  }

  SelectLast() {
    this.FocusedNode.Value.SelectLast();
  }
}
