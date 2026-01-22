import { Link } from '../../../structures/link/link.i';
import { SelectionLinker } from '../../../structures/link/selection-linker.structure';
import { MathTerm } from '../../abstract/math-term.abstract';
import { Character } from './expression-character.model';

export class Expression extends MathTerm {
  private _chars: SelectionLinker<InternalExpressionCharacter> =
    new SelectionLinker();

  private _link: Link<Expression> | null = null;

  get Link() {
    if (this._link) return this._link;
    throw new Error('Link not set already!');
  }

  set Link(link: Link<Expression>) {
    if (this._link) throw new Error('Link already set!');
    this._link = link;
  }

  Add(char: string) {
    const internalChar = new InternalExpressionCharacter(char, this);
    const charLink = this._chars.Add(internalChar);
    internalChar.Link = charLink;
  }

  Remove() {
    this._chars.Remove();
  }

  Select(link: Link<Character>) {
    this._chars.Select(link as Link<InternalExpressionCharacter>);
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

  SelectTailCharacter() {
    this._chars.SelectTail();
  }

  public get Selection(): Link<Character> | null {
    return this._chars.Selection;
  }

  public get Characters() {
    return this._chars.AsArray;
  }
}

class InternalExpressionCharacter implements Character {
  constructor(
    public readonly Character: string,
    public readonly ParentExpression: Expression,
  ) {}
  private _link: Link<Character> | null = null;

  set Link(link: Link<Character>) {
    this._link = link;
  }

  get Link() {
    if (!this._link) throw new Error('Link not established yet!');
    return this._link;
  }
}
