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
import { SelectionLinker } from '../../../../../../core/structures/link/selection-linker.structure';

@Component({
  selector: 'math-input-term-list',
  templateUrl: './term-list.component.html',
  styleUrl: './term-list.component.css',
})
export class TermListComponent {
  @ViewChildren(MathTermViewDirective)
  protected _renderedTermList!: QueryList<MathTermViewDirective>;
  protected _termList = new TermList();
  private _renderedTermLinker = new SelectionLinker<MathTermViewDirective>();
  private _cdr = inject(ChangeDetectorRef);

  public get SelectedElement(): MathTermViewDirective | null {
    return this._renderedTermLinker.getSelection()?.Value || null;
  }

  public add(char: string) {
    this._termList.addCharacter(char);
    this._cdr.detectChanges();

    const linkerSelection = this.SelectedElement;

    const newRenderedTerm = linkerSelection
      ? this._renderedTermList.get(linkerSelection.Index + 1)
      : this._renderedTermList.first;
    if (!newRenderedTerm) return;
    this._renderedTermLinker.add(newRenderedTerm);
  }

  public SelectPrev() {
    this._renderedTermLinker.selectPrev();
    this._termList.SelectPrev();
  }

  public SelectNext() {
    this._renderedTermLinker.selectNext();
    this._termList.SelectNext();
  }

  protected isExpression(term: MathTerm): term is Expression {
    return term instanceof Expression;
  }
}
