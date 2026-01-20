import {
  ChangeDetectorRef,
  Component,
  inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { TermList } from '../../../../../../core/domain/structures/term-list/term-list.model';
import { MathTerm } from '../../../../../../core/domain/abstract/math-term.abstract';
import { Expression } from '../../../../../../core/domain/model/expression/expression.model';
import { MathTermViewDirective } from '../../directives/math-term-view/math-term-view.directive';

@Component({
  selector: 'math-input-term-list',
  templateUrl: './term-list.component.html',
  styleUrl: './term-list.component.css',
})
export class TermListComponent {
  @ViewChildren(MathTermViewDirective)
  protected _renderedTermList!: QueryList<MathTermViewDirective>;
  protected _termList = new TermList();
  private _cdr = inject(ChangeDetectorRef);

  public get SelectedElement(): MathTermViewDirective | null {
    const selectedIndex = this._termList.SelectedCharacterIndex;
    if (selectedIndex != null)
      return this._renderedTermList.get(selectedIndex) || null;
    return null;
  }

  public Add(char: string) {
    this._termList.AddCharacter(char);
    this._cdr.detectChanges();
  }

  public Remove() {
    this._termList.RemoveCharacter();
    this._cdr.detectChanges();
  }

  public SelectPrev() {
    this._termList.SelectPrev();
  }

  public SelectNext() {
    this._termList.SelectNext();
  }

  public SelectTail() {
    this._termList.SelectTail();
  }

  public SelectLast() {
    this._termList.SelectLast();
  }

  protected IsExpression(term: MathTerm): term is Expression {
    return term instanceof Expression;
  }
}
