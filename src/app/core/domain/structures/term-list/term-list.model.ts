import { Link } from '../../../structures/link/link.i';
import { SelectionLinker } from '../../../structures/link/selection-linker.structure';
import { MathTerm } from '../../abstract/math-term.abstract';
import { Character } from '../../model/expression/expression-character.model';
import { Expression } from '../../model/expression/expression.model';

export class TermList {
  private _linker: SelectionLinker<MathTerm> = new SelectionLinker<MathTerm>();

  public AddCharacter(char: string) {
    let actualExpression = this._selectedExpression;
    if (!actualExpression) {
      actualExpression = new Expression();
      const expressionLink = this._linker.Add(actualExpression);
      actualExpression.Link = expressionLink as Link<Expression>;
    }
    actualExpression.Add(char);
  }

  public RemoveCharacter() {
    let actualExpression = this._selectedExpression;
    if (actualExpression) actualExpression.Remove();
  }

  public SelectCharacter(char: Character) {
    const selectedExpression = char.ParentExpression;
    this._linker.Select(selectedExpression.Link);
    selectedExpression.Select(char.Link);
  }

  public SelectPrev() {
    const selectedExpression = this._selectedExpression;
    if (selectedExpression) selectedExpression.SelectPrevCharacter();
  }

  public SelectNext() {
    const selectedExpression = this._selectedExpression;
    if (selectedExpression) selectedExpression.SelectNextCharacter();
  }

  public SelectLast() {
    const selectedExpression = this._selectedExpression;
    if (selectedExpression) selectedExpression.SelectLastCharacter();
  }

  public SelectTail() {
    const selectedExpression = this._selectedExpression;
    if (selectedExpression) selectedExpression.SelectTail();
  }

  public get AsArray() {
    return this._linker.AsArray;
  }

  public get SelectedCharacterIndex(): number | null {
    if (this._selectedExpression && this._selectedExpression.Selection)
      return this._selectedExpression.Selection.Index;
    return null;
  }

  public get SelectedCharacter(): Character | null {
    return this._selectedExpression?.Selection?.Value || null;
  }

  private get _selectedExpression() {
    const linkerSelection = this._linker.Selection;
    const selectionValue = linkerSelection?.Value;
    if (selectionValue && selectionValue instanceof Expression)
      return selectionValue;
    return null;
  }
}
