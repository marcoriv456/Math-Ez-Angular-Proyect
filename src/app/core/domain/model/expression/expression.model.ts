import { SelectionLinker } from '../../../structures/link/selection-linker.structure';
import { MathTerm } from '../../abstract/math-term.abstract';

export class Expression extends MathTerm {
  private _chars: SelectionLinker<string> = new SelectionLinker();
  add(char: string) {
    this._chars.add(char);
  }
  SelectNextCharacter() {
    this._chars.selectNext();
  }
  SelectPrevCharacter() {
    this._chars.selectPrev();
  }

  public charArray() {
    return this._chars.array();
  }
}
