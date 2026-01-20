import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { TermList } from '../../../../../../core/domain/structures/term-list/term-list.model';
import { MathTerm } from '../../../../../../core/domain/abstract/math-term.abstract';
import { Expression } from '../../../../../../core/domain/model/expression/expression.model';
import { MathTermViewDirective } from '../../directives/math-term-view/math-term-view.directive';
import { DomPositionCalculator } from '../../../core/helpers/dom-position-calculator.helper';

@Component({
  selector: 'math-input-term-list',
  templateUrl: './term-list.component.html',
  styleUrl: './term-list.component.css',
})
export class TermListComponent {
  @ViewChildren(MathTermViewDirective)
  protected readonly _renderedTermList!: QueryList<MathTermViewDirective>;
  protected readonly _termList = new TermList();
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _ref = inject(ElementRef<HTMLElement>);

  public get SelectedElement(): MathTermViewDirective | null {
    const selectedIndex = this._termList.SelectedCharacterIndex;
    if (selectedIndex != null)
      return this._renderedTermList.get(selectedIndex) || null;
    return null;
  }

  public get CaretPosition() {
    const selected = this.SelectedElement;
    return selected ? selected.PositionX : this._positionX;
  }

  public GoForward(): number {
    this._termList.SelectNext();
    return this.CaretPosition;
  }

  public GoBackward() {
    this._termList.SelectPrev();
    return this.CaretPosition;
  }

  public GoStart() {
    this._termList.SelectTail();
    return this.CaretPosition;
  }

  public GoEnd() {
    this._termList.SelectLast();
    return this.CaretPosition;
  }

  public Add(char: string) {
    this._termList.AddCharacter(char);
    this._cdr.detectChanges();
    return this.CaretPosition;
  }

  public Remove() {
    this._termList.RemoveCharacter();
    this._cdr.detectChanges();
    return this.CaretPosition;
  }

  protected IsExpression(term: MathTerm): term is Expression {
    return term instanceof Expression;
  }

  private get _positionX() {
    return DomPositionCalculator.PositionX(
      this._ref.nativeElement,
      'APP-MATH-INPUT',
    );
  }
}
