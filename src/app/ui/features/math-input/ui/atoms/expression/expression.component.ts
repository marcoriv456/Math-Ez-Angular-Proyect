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
import { DomPositionCalculator } from '../../../core/helpers/dom-position-calculator.helper';
import { CaretLayout } from '../../../core/structures/caret-layout.type';
import { CompositeExpressionNodeView } from '../../abstracts/composite-expression-node-view.abstract';
import { ExpressionNodeView } from '../../abstracts/expression-node-view.abstract';

@Component({
  selector: 'math-expression',
  templateUrl: './expression.component.html',
  styleUrl: './expression.component.css',
})
export class ExpressionComponent {
  @Input({ required: true }) Expression!: Expression;

  @Output() Click = new EventEmitter<number>();
  @ViewChildren(ExpressionNodeView)
  protected readonly _renderedTermList!: QueryList<ExpressionNodeView>;

  private readonly _ref = inject(ElementRef<HTMLElement>);
  private readonly _cdr = inject(ChangeDetectorRef);

  private get _activeNode(): ExpressionNodeView | null {
    const activeNodeIndex = this.Expression.ActiveNode?.Index;
    if (activeNodeIndex != null)
      return this._renderedTermList.get(activeNodeIndex) || null;
    return null;
  }

  private get _focusedNode(): CompositeExpressionNodeView | null {
    const focusedNodeIndex = this.Expression.FocusedNode?.Index;
    if (focusedNodeIndex == null) return null;
    const focusedNode = this._renderedTermList.get(focusedNodeIndex);
    if (!focusedNode) return null;
    return focusedNode as CompositeExpressionNodeView;
  }

  public get CaretLayout(): CaretLayout {
    if (this._focusedNode) return this._focusedNode.CaretLayout;
    const selected = this._activeNode;
    return selected ? selected.CaretLayout : this._defaultCaretLayout;
  }

  public GoForward(): CaretLayout {
    this.Expression.SelectNext();
    return this.CaretLayout;
  }

  public GoBackward(): CaretLayout {
    this.Expression.SelectPrev();
    return this.CaretLayout;
  }

  public GoStart(): CaretLayout {
    this.Expression.SelectTail();
    return this.CaretLayout;
  }

  public GoEnd(): CaretLayout {
    this.Expression.SelectLast();
    return this.CaretLayout;
  }

  public Add(node: ExpressionNode): CaretLayout {
    this.Expression.Add(node);
    this._cdr.detectChanges();
    return this.CaretLayout;
  }

  public Remove(): CaretLayout {
    this.Expression.Remove();
    this._cdr.detectChanges();
    return this.CaretLayout;
  }

  protected IsCharacter(node: ExpressionNode): node is Character {
    return node instanceof Character;
  }

  protected IsFraction(node: ExpressionNode): node is Fraction {
    return node instanceof Fraction;
  }

  private get _defaultCaretLayout() {
    return {
      X: DomPositionCalculator.PositionX(
        this._ref.nativeElement,
        'APP-MATH-INPUT',
      ),
      Y: this._ref.nativeElement.offsetTop,
      Height: this._ref.nativeElement.offsetHeight,
    };
  }
}
