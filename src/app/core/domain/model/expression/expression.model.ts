import { Link } from '../../../structures/link/link.i';
import { Linkable } from '../../../structures/link/linkable.interface';
import { SelectionLinker } from '../../../structures/link/selection-linker.structure';
import { Parentable } from '../../../structures/parentable/parentable.interface';
import { CompositeExpressionNode } from '../../abstract/composite-expression-node.interface';
import { ExpressionNode } from '../../abstract/expression-node.interface';

export abstract class Expression
  implements Linkable<Expression>, Parentable<CompositeExpressionNode>
{
  private _link: Link<Expression> | null = null;
  private _focusedNodeLink: Link<CompositeExpressionNode> | null = null;
  protected _linker = new SelectionLinker<ExpressionNode>();
  abstract readonly Parent: CompositeExpressionNode;

  get Link(): Link<Expression> {
    if (!this._link) throw new Error('Link not set already.');
    return this._link;
  }

  set Link(link: Link<Expression>) {
    if (this._link) throw new Error('Link already set');
    this._link = link;
  }

  get AsArray() {
    return this._linker.AsArray;
  }

  get ActiveNode(): ExpressionNode | null {
    return this._activeNodeLink?.Value || null;
  }

  get ActiveNodeIndex(): number | null {
    if (this._focusedNode) return this._focusedNode.ActiveNodeIndex;
    if (this._activeNodeLink) return this._activeNodeLink.Index;
    return null;
  }
  get FocusedNodeIndex(): number | null {
    if (this._focusedNodeLink) return this._focusedNodeLink.Index;
    return null;
  }

  private get _focusedNode(): CompositeExpressionNode | null {
    return this._focusedNodeLink?.Value || null;
  }

  private get _activeNodeLink() {
    return this._linker.Selection;
  }

  Add(element: ExpressionNode) {
    if (this._focusedNode) {
      this._focusedNode.Add(element);
    } else {
      const elementLink = this._linker.Add(element);
      element.Link = elementLink;
      element.Parent = this;
      if (element instanceof CompositeExpressionNode)
        this._focusedNodeLink = elementLink as Link<CompositeExpressionNode>;
    }
  }

  Remove() {
    if (this._focusedNode) {
      this._focusedNode.Remove();
    } else {
      this._linker.Remove();
    }
  }

  Select(node: Link<ExpressionNode>) {
    this._linker.Select(node);
    this.Parent.Select(this.Link);
  }

  Focus(node: CompositeExpressionNode) {
    this._focusedNodeLink = node.Link;
  }

  UnFocus() {
    this._focusedNodeLink = null;
  }

  SelectPrev() {
    if (this._focusedNode) {
      this._focusedNode.MoveBackward();
    } else {
      this._linker.SelectPrev();
    }
  }
  //
  SelectNext() {
    if (this._focusedNode) {
      this._focusedNode.MoveForward();
    } else {
      this._linker.SelectNext();
    }
  }
  //
  SelectLast() {
    if (this._focusedNode) {
      this._focusedNode.MoveHead();
    } else {
      this._linker.SelectNext();
    }
  }

  SelectTail() {
    if (this._focusedNode) {
      this._focusedNode.MoveTail();
    } else {
      this._linker.SelectTail();
    }
  }
}
