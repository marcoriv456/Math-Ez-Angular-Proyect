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
    if (this.FocusedNode.Value.HasNext) {
      console.log('1st');
      this.FocusedNode.Value.SelectNext();
    } else if (this._hasNextExpression) {
      console.log('2nd');
      this._expressionLinker.SelectNext();
      this.FocusedNode.Value.SelectTail();
    } else {
      console.log('else');
      this.Parent.Blur().andKeepSelection();
    }
  }

  get HasNext(): boolean {
    return (
      this.FocusedNode.Value.HasNext ||
      this._expressionLinker.HasNext ||
      this.Parent.HasNextNodes ||
      this.Parent.HasFocused
    );
  }

  SelectPrev() {
    if (this.FocusedNode.Value.HasPrev) {
      this.FocusedNode.Value.SelectPrev();
    } else if (this._hasPrevExpression) {
      this._expressionLinker.SelectPrev();
      this.FocusedNode.Value.SelectLast();
    } else {
      this.Parent.Blur().andSelectPrev();
    }
  }

  get HasPrev() {
    return (
      this.FocusedNode.Value.HasPrev ||
      this._expressionLinker.HasPrev ||
      this.Parent.HasPrevNodes ||
      this.Parent.HasFocused
    );
  }

  SelectTail() {
    this.FocusedNode.Value.SelectTail();
  }

  SelectLast() {
    this.FocusedNode.Value.SelectLast();
  }

  SelectLastExpression() {
    this._expressionLinker.SelectLast();
  }

  SelectFirstExpression() {
    this._expressionLinker.SelectFirst();
  }

  private get _hasNextExpression() {
    return this._expressionLinker.HasNext;
  }

  private get _hasPrevExpression() {
    return this._expressionLinker.HasPrev;
  }
}
