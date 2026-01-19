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

  public get SelectedElement() {
    return this._renderedTermLinker.getSelection();
  }

  public add(char: string) {
    this._termList.addCharacter(char);
    this._cdr.detectChanges();

    const linkerSelection = this.SelectedElement;

    const newRenderedTerm = linkerSelection
      ? this._renderedTermList.get(linkerSelection.Value.Index + 1)
      : this._renderedTermList.first;
    if (!newRenderedTerm) return;
    this._renderedTermLinker.add(newRenderedTerm);
  }

  protected isExpression(term: MathTerm): term is Expression {
    return term instanceof Expression;
  }
}
