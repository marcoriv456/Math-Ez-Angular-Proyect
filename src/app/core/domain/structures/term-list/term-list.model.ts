import { Linker } from '../../../structures/link/linker.i';
import { SelectionLinker } from '../../../structures/link/selection-linker.structure';
import { MathTerm } from '../../abstract/math-term.abstract';
import { Expression } from '../../model/expression/expression.model';

export class TermList {
  private _linker: SelectionLinker<MathTerm> = new SelectionLinker<MathTerm>();

  public addCharacter(char: string) {
    const linkerSelection = this._linker.getSelection();
    let actualExpression: Expression;
    if (!linkerSelection || !(linkerSelection.Value instanceof Expression)) {
      actualExpression = new Expression();
      this._linker.add(actualExpression);
    } else {
      actualExpression = linkerSelection.Value;
    }
    actualExpression.add(char);
  }

  public SelectPrev() {
    const selectedExpression = this.selectedExpression;
    if (selectedExpression) selectedExpression.SelectPrevCharacter();
  }

  public SelectNext() {
    const selectedExpression = this.selectedExpression;
    if (selectedExpression) selectedExpression.SelectNextCharacter();
  }

  public SelectLast() {
    const selectedExpression = this.selectedExpression;
    if (selectedExpression) selectedExpression.SelectLastCharacter();
  }

  public SelectTail() {
    const selectedExpression = this.selectedExpression;
    if (selectedExpression) selectedExpression.SelectTail();
  }

  private get selectedExpression() {
    const linkerSelection = this._linker.getSelection();
    const selectionValue = linkerSelection?.Value;
    if (selectionValue && selectionValue instanceof Expression)
      return selectionValue;
    return null;
  }

  public remove() {
    this._linker.remove();
  }

  public array() {
    return this._linker.array();
  }
}
