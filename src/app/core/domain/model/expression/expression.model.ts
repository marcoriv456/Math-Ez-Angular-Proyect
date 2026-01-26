import { EditingCursor } from '../../../structures/cursor/editing-cursor.interface';
import { FocusedAt } from '../../../structures/focus/focused-at.interface';
import { Indexed } from '../../../structures/index/indexable.structure';
import { Link } from '../../../structures/link/link.i';
import { Linkable } from '../../../structures/link/linkable.interface';
import { SelectionLinker } from '../../../structures/link/selection-linker.structure';
import { Parentable } from '../../../structures/parentable/parentable.interface';
import { CompositeExpressionNode } from '../../abstract/composite-expression-node.interface';
import { ExpressionNode } from '../../abstract/expression-node.interface';

export abstract class Expression
  implements
  Linkable<Expression>,
  Linkable<Expression>,
  Linkable<Expression>,
  Parentable<CompositeExpressionNode>,
  EditingCursor<ExpressionNode>,
  FocusedAt<CompositeExpressionNode> {
  // Linkable
  private _link: Link<Expression> | null = null;

  get Link(): Link<Expression> {
    if (!this._link) throw new Error('Link not set already.');
    return this._link;
  }

  set Link(link: Link<Expression>) {
    if (this._link) throw new Error('Link already set');
    this._link = link;
  }

  // Parentable
  abstract readonly Parent: CompositeExpressionNode;

  // FocusedAt
  get FocusedNode(): Indexed<CompositeExpressionNode> | null {
    return this._focusedNode;
  }

  protected _focusedNode: Indexed<CompositeExpressionNode> | null = null;

  // EditingCursor
  protected _linker = new SelectionLinker<ExpressionNode>();

  get ActiveNode(): Indexed<ExpressionNode> | null {
    return this._linker.Selection;
  }

  get AsArray() {
    return this._linker.AsArray;
  }

  //FocusedAt
  Focus(node: CompositeExpressionNode) {
    console.log('focused');
    this._focusedNode = node.Link;
    this.Parent.Focus(this);
  }

  UnFocus() {
    this._focusedNode = null;
    console.log('unfocused');
  }

  // EditingCursor
  Add(element: ExpressionNode) {
    if (this._focusedNode) {
      this._focusedNode.Value.Add(element);
    } else {
      const elementLink = this._linker.Add(element);
      element.Link = elementLink;
      element.Parent = this;
      if (element instanceof CompositeExpressionNode) {
        this.Focus(element);
      }
    }
  }

  Remove() {
    if (this._focusedNode) {
      this._focusedNode.Value.Remove();
    } else {
      this._linker.Remove();
    }
  }

  Select(node: ExpressionNode) {
    this._linker.Select(node.Link);
    this.Parent.Focus(this);
  }

  SelectNext() {
    if (this._focusedNode) {
      this._focusedNode.Value.SelectNext();
    } else {
      this._linker.SelectNext();
      if (this.ActiveNode?.Value instanceof CompositeExpressionNode) {
        this.Focus(this.ActiveNode.Value);
        this.FocusedNode?.Value.SelectFirstExpression();
        this.FocusedNode?.Value.SelectTail();
      }
    }
  }

  get HasNext(): boolean {
    if (this._focusedNode) return this._focusedNode.Value.HasNext;
    return this._linker.HasNext;
  }

  SelectPrev() {
    if (this._focusedNode) {
      this._focusedNode.Value.SelectPrev();
    } else {
      this._linker.SelectPrev();
      if (this.ActiveNode?.Value instanceof CompositeExpressionNode) {
        this.Focus(this.ActiveNode.Value);
        this.FocusedNode?.Value.SelectLastExpression();
        this.FocusedNode?.Value.SelectLast();
      }
    }
  }

  get HasPrev(): boolean {
    if (this._focusedNode) return this._focusedNode.Value.HasPrev;
    return this._linker.HasPrev;
  }
  SelectLast() {
    if (this._focusedNode) {
      this._focusedNode.Value.SelectLast();
    } else {
      this._linker.SelectLast();
    }
  }

  SelectTail() {
    if (this._focusedNode) {
      this._focusedNode.Value.SelectTail();
    } else {
      this._linker.SelectTail();
    }
  }
}
