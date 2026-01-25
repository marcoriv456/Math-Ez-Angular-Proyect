import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ExpressionNode } from '../../../../../../core/domain/abstract/expression-node.interface';
import { Character } from '../../../../../../core/domain/model/character/character.model';
import { Expression } from '../../../../../../core/domain/model/expression/expression.model';
import { Fraction } from '../../../../../../core/domain/model/fraction/fraction.model';
import { Link } from '../../../../../../core/structures/link/link.i';
import { DomPositionCalculator } from '../../../core/helpers/dom-position-calculator.helper';
import { CompositeExpressionNodeView } from '../../abstracts/composite-expression-node-view.abstract';
import { ExpressionNodeView } from '../../abstracts/expression-node-view.abstract';
import { MathTermViewDirective } from '../../directives/math-term-view/math-term-view.directive';

@Component({
  selector: 'math-input-term-list',
  templateUrl: './term-list.component.html',
  styleUrl: './term-list.component.css',
})
export class TermListComponent {
  @Input({ required: true }) Expression!: Expression;

  @Output() Click = new EventEmitter<number>();
  @ViewChildren(ExpressionNodeView)
  protected readonly _renderedTermList!: QueryList<ExpressionNodeView>;

  private readonly _ref = inject(ElementRef<HTMLElement>);
  private readonly _cdr = inject(ChangeDetectorRef);

  private get _activeNode(): ExpressionNodeView | null {
    const activeNodeIndex = this.Expression.ActiveNodeIndex;
    if (activeNodeIndex != null)
      return this._renderedTermList.get(activeNodeIndex) || null;
    return null;
  }

  private get _focusedNode(): CompositeExpressionNodeView | null {
    const focusedNodeIndex = this.Expression.FocusedNodeIndex;
    if (focusedNodeIndex == null) return null;
    const focusedNode = this._renderedTermList.get(focusedNodeIndex);
    if (!focusedNode) return null;
    return focusedNode as CompositeExpressionNodeView;
  }

  public get CaretPosition() {
    if (this._focusedNode) return this._focusedNode.CaretPosition;
    const selected = this._activeNode;
    return selected ? selected.RightBorderPosition : this._positionX;
  }

  public GoForward(): number {
    this.Expression.SelectNext();
    return this.CaretPosition;
  }

  public GoBackward() {
    this.Expression.SelectPrev();
    return this.CaretPosition;
  }

  public GoStart() {
    this.Expression.SelectTail();
    return this.CaretPosition;
  }

  public GoEnd() {
    this.Expression.SelectLast();
    return this.CaretPosition;
  }

  public Add(node: ExpressionNode) {
    this.Expression.Add(node);
    this._cdr.detectChanges();
    return this.CaretPosition;
  }

  public Remove() {
    this.Expression.Remove();
    this._cdr.detectChanges();
    return this.CaretPosition;
  }

  protected IsCharacter(node: ExpressionNode): node is Character {
    return node instanceof Character;
  }

  protected IsFraction(node: ExpressionNode): node is Fraction {
    return node instanceof Fraction;
  }

  protected OnCharacterClick(
    modelChar: Character,
    viewChar: MathTermViewDirective,
    clickSide: 'left' | 'right',
  ) {
    let selected: Link<Character> | null = modelChar.Link;
    let caretPosition: number = viewChar.RightBorderPosition;

    if (clickSide == 'left') {
      selected = modelChar.Link.Prev;
      caretPosition = viewChar.LeftBorderPosition;
    }

    if (selected) this.Expression.Select(selected);
    else this.Expression.SelectTail();

    this.Click.emit(caretPosition);
  }

  private get _positionX() {
    return DomPositionCalculator.PositionX(
      this._ref.nativeElement,
      'APP-MATH-INPUT',
    );
  }
}
