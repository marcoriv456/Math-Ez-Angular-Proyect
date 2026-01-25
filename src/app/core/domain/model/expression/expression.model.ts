import { Link } from '../../../structures/link/link.i';
import { Linkable } from '../../../structures/link/linkable.interface';
import { SelectionLinker } from '../../../structures/link/selection-linker.structure';
import { Parentable } from '../../../structures/parentable/parentable.interface';
import { CompositeExpressionNode } from '../../abstract/composite-expression-node.interface';
import { ExpressionNode } from '../../abstract/expression-node.interface';
import { Character } from '../character/character.model';

export abstract class Expression
  implements Linkable<Expression>, Parentable<CompositeExpressionNode>
{
  private _link: Link<Expression> | null = null;
  private _focusedNode: CompositeExpressionNode | null = null;
  protected _linker = new SelectionLinker<ExpressionNode>();
  abstract readonly Parent: CompositeExpressionNode;

  public get Link(): Link<Expression> {
    if (!this._link) throw new Error('Link not set already.');
    return this._link;
  }

  public set Link(link: Link<Expression>) {
    if (this._link) throw new Error('Link already set');
    this._link = link;
  }

  public get AsArray() {
    return this._linker.AsArray;
  }

  public get ActiveNodeIndex(): number | null {
    if (this._activeNodeLink) return this._activeNodeLink.Index;
    return null;
  }

  private get _activeNode(): ExpressionNode | null {
    return this._activeNodeLink?.Value || null;
  }

  private get _activeNodeLink() {
    return this._linker.Selection;
  }

  public AddCharacter(char: string) {
    const character = new Character(char, this);
    const link = this._linker.Add(character);
    character.Link = link as Link<Character>;
  }

  public Add(element: ExpressionNode) {
    const activeNode = this._activeNode;
    if (activeNode instanceof CompositeExpressionNode) {
      activeNode.Add(element);
    } else {
      this._linker.Add(element);
    }
  }

  public RemoveCharacter() {
    const activeNode = this._activeNode;
    if (activeNode instanceof CompositeExpressionNode) activeNode.Remove();
    else this._linker.Remove();
  }

  public Select(node: Link<ExpressionNode>) {
    this._linker.Select(node);
    this.Parent.Select(this.Link);
  }

  public Focus(node: CompositeExpressionNode) {
    this._focusedNode = node;
  }

  public UnFocus() {
    this._focusedNode = null;
  }

  public SelectPrev() {
    if (this._focusedNode) {
      this._focusedNode.MoveBackward();
    } else {
      this._linker.SelectPrev();
    }
  }
  //
  public SelectNext() {
    if (this._focusedNode) {
      this._focusedNode.MoveForward();
    } else {
      this._linker.SelectNext();
    }
  }
  //
  public SelectLast() {
    if (this._focusedNode) {
      this._focusedNode.MoveHead();
    } else {
      this._linker.SelectNext();
    }
  }

  public SelectTail() {
    if (this._focusedNode) {
      this._focusedNode.MoveTail();
    } else {
      this._linker.SelectTail();
    }
  }

  //
  // public get SelectedCharacter(): Character | null {
  //   return this._selectedExpression?.Selection?.Value || null;
  // }
  //

  // private get _selectedExpression() {
  //   const linkerSelection = this._linker.Selection;
  //   const selectionValue = linkerSelection?.Value;
  //   if (selectionValue && selectionValue instanceof Expression)
  //     return selectionValue;
  //   return null;
  // }
}
