import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { TermList } from '../../../../../../core/domain/structures/term-list/term-list.model';
import { MathTerm } from '../../../../../../core/domain/abstract/math-term.abstract';
import { Expression } from '../../../../../../core/domain/model/expression/expression.model';
import { MathTermViewDirective } from '../../directives/math-term-view/math-term-view.directive';
import { DomPositionCalculator } from '../../../core/helpers/dom-position-calculator.helper';
import { Character } from '../../../../../../core/domain/model/expression/expression-character.model';
import { Link } from '../../../../../../core/structures/link/link.i';
import { LinkStringifier } from '../../../core/utils/link-stringifier.util';

@Component({
  selector: 'math-input-term-list',
  templateUrl: './term-list.component.html',
  styleUrl: './term-list.component.css',
})
export class TermListComponent {
  @Output() Click = new EventEmitter<number>();
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
    return selected ? selected.RightBorderPosition : this._positionX;
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

  protected OnCharacterClick(
    modelChar: Character,
    viewChar: MathTermViewDirective,
    clickSide: 'left' | 'right',
  ) {
    let selected: Link<Character> | null;
    let caretPosition: number;
    if (clickSide == 'left') {
      selected = modelChar.Link.Prev;
      caretPosition = viewChar.LeftBorderPosition;
    } else {
      selected = modelChar.Link;
      caretPosition = viewChar.RightBorderPosition;
    }
    // TODO: write tests tomorrow
    if (selected) this._termList.SelectCharacter(selected.Value);
    else this._termList.SelectTail();
    if (this._termList.SelectedCharacter)
      console.log(
        LinkStringifier.ToString<Character>(
          this._termList.SelectedCharacter.Link,
          (el) => el?.Character || null,
        ),
      );

    this.Click.emit(caretPosition);
  }

  private get _positionX() {
    return DomPositionCalculator.PositionX(
      this._ref.nativeElement,
      'APP-MATH-INPUT',
    );
  }
}
