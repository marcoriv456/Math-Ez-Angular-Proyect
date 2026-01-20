import { SelectionLinker } from '../../../structures/link/selection-linker.structure';
import { MathTerm } from '../../abstract/math-term.abstract';
import { Expression } from '../../model/expression/expression.model';

export class TermList {
  private _linker: SelectionLinker<MathTerm> = new SelectionLinker<MathTerm>();

  public addCharacter(char: string) {
    let actualExpression = this.selectedExpression;
    if (!actualExpression) {
      actualExpression = new Expression();
      this._linker.add(actualExpression);
    }
    actualExpression.add(char);
  }

  public RemoveCharacter() {
    let actualExpression = this.selectedExpression;
    if (actualExpression) actualExpression.Remove();
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

  public get selectedCharacterIndex(): number | null {
    if (this.selectedExpression && this.selectedExpression.Selection)
      return this.selectedExpression.Selection.Index;
    return null;
  }

  private get selectedExpression() {
    const linkerSelection = this._linker.getSelection();
    const selectionValue = linkerSelection?.Value;
    if (selectionValue && selectionValue instanceof Expression)
      return selectionValue;
    return null;
  }

  public array() {
    return this._linker.array();
  }
}
