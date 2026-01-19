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

  SelectLastCharacter() {
    this._chars.selectLast();
  }

  SelectTail() {
    this._chars.selectTail();
  }

  public charArray() {
    return this._chars.array();
  }
}
