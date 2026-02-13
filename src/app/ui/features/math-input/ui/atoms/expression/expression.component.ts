import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ExpressionNode } from '../../../../../../core/domain/abstract/expression-node.interface';
import { Character } from '../../../../../../core/domain/model/character/character.model';
import { Expression } from '../../../../../../core/domain/model/expression/expression.model';
import { Fraction } from '../../../../../../core/domain/model/fraction/fraction.model';
import { CharacterClickEvent } from '../../../core/events/character-click.event';
import { DomPositionCalculator } from '../../../core/helpers/dom-position-calculator.helper';
import { MathInputEventBusService } from '../../../core/services/math-input-event-bus/math-input-event-bus.service';
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

  @ViewChildren(ExpressionNodeView)
  protected readonly _renderedTermList!: QueryList<ExpressionNodeView>;

  private readonly _ref = inject(ElementRef<HTMLElement>);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _eventBus = inject(MathInputEventBusService);

  private get _activeNode(): ExpressionNodeView | null {
    const activeNodeIndex = this.Expression.ActiveNode?.Index;
    if (activeNodeIndex == null) return null;
    const activeNode = this._renderedTermList.get(activeNodeIndex);
    if (!activeNode) return null;
    return activeNode;
  }

  public get CaretLayout(): CaretLayout {
    if (this._focusedNode) {
      return this._focusedNode.CompositeCaretLayout;
    }
    const selected = this._activeNode;
    return selected ? selected.CaretLayout : this._defaultCaretLayout;
  }

  private get _focusedNode(): CompositeExpressionNodeView | null {
    const focusedNode = this.Expression.FocusedNode;
    if (focusedNode == undefined) {
      return null;
    }
    const renderedFocusedNode = this._renderedTermList.get(focusedNode.Index);
    if (!renderedFocusedNode) {
      return null;
    }
    return renderedFocusedNode as CompositeExpressionNodeView;
  }

  @HostListener('click', ['$event'])
  protected OnClick(event: MouseEvent) {
    console.log('hola');
    event.stopPropagation();
    const clickPosition = event.offsetX;
    let side: 'left' | 'right' =
      this._ref.nativeElement.offsetWidth / 2 > clickPosition
        ? 'left'
        : 'right';
    if (side == 'left') this.Expression.SelectTail();
    else this.Expression.SelectLast();
    this._cdr.detectChanges();
    this._eventBus.emit(new CharacterClickEvent());
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

  protected SelectOnSide(char: Character, side: 'left' | 'right') {
    this.Expression.Select(char);
    if (side == 'left') this.Expression.SelectPrev();
    this._cdr.detectChanges();
    this._eventBus.emit(new CharacterClickEvent());
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
      Y: DomPositionCalculator.PositionY(
        this._ref.nativeElement,
        'APP-MATH-INPUT',
      ),
      Height: this._ref.nativeElement.offsetHeight,
    };
  }
}
