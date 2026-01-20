import { SelectionLinker } from '../../../structures/link/selection-linker.structure';
import { MathTerm } from '../../abstract/math-term.abstract';

export class Expression extends MathTerm {
  private _chars: SelectionLinker<string> = new SelectionLinker();
  Add(char: string) {
    this._chars.Add(char);
  }
  Remove() {
    this._chars.Remove();
  }
  SelectNextCharacter() {
    this._chars.SelectNext();
  }
  SelectPrevCharacter() {
    this._chars.SelectPrev();
  }

  SelectLastCharacter() {
    this._chars.SelectLast();
  }

  SelectTail() {
    this._chars.SelectTail();
  }

  public get Selection() {
    return this._chars.Selection;
  }

  public get CharArray() {
    return this._chars.AsArray;
  }
}
