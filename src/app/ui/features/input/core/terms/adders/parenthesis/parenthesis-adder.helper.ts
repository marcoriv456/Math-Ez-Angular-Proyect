import { Term } from '../../../models/terms/term.model';
import { TermAdder } from '../../../models/term-adder.model';
import { TermAdderInstructions } from '../../../models/actions/term-adder-instructions.model';

export class ParenthesisAdder implements TermAdder {
  private removeFrom!: number;
  private removeTo!: number;

  private sliceFrom!: number;
  private sliceTo!: number;

  constructor(
    private index: number,
    private terms: Term[],
    private parenthesis: '(' | ')',
  ) {}

  add(): TermAdderInstructions {
    this.setupAutocompletion();
    const replaceCount = this.removeTo - this.removeFrom;
    return {
      replaceCount,
      replaceFrom: this.removeFrom,
      term: {
        type: 'parenthesis',
        parenthesisChildren: this.terms.slice(this.sliceFrom, this.sliceTo),
      },
      containerToMoveAt: this.parenthesis == ')' ? 'outside' : 0,
    };
  }

  private setupAutocompletion() {
    if (this.parenthesis == '(') this.scanForward();

    if (this.parenthesis == ')') this.setupWithOpenParenthesis();
  }

  private setupWithOpenParenthesis() {
    const openParenthesisIndex = this.findOpenParenthesisIndex();
    if (openParenthesisIndex === undefined)
      throw new Error('Not matching parenthesis found');

    this.sliceFrom = openParenthesisIndex + 1;
    this.sliceTo = this.index + 1;

    this.removeFrom = openParenthesisIndex;
    this.removeTo = this.index + 1;
  }

  private scanForward() {
    const closedParenthesisIndex = this.findClosedParenthesisIndex();
    if (closedParenthesisIndex === undefined)
      throw new Error('Not matching parenthesis found');

    this.sliceFrom = this.index + 1;
    this.sliceTo = closedParenthesisIndex;

    this.removeFrom = this.index + 1;
    this.removeTo = closedParenthesisIndex + 1;
  }

  private findClosedParenthesisIndex() {
    for (let i = this.index; i < this.terms.length; i++) {
      let term = this.terms[i];
      if (term && term.type == 'char' && term.char == ')') return i;
    }
    return;
  }

  private findOpenParenthesisIndex() {
    for (let i = this.index; i >= 0; i--) {
      let term = this.terms[i];
      if (term && term.type == 'char' && term.char == '(') return i;
    }
    return;
  }
}
