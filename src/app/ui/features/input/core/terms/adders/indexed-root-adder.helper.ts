import { TermAdder } from '../../models/term-adder.model';
import { TermAdderInstructions } from '../../models/actions/term-adder-instructions.model';

export class IndexedRootAdder implements TermAdder {
  constructor(private index: number) {}

  add(): TermAdderInstructions {
    return {
      replaceFrom: this.index + 1,
      term: { type: 'root', rootChildren: [], radicalTerms: [] },
      replaceCount: 0,
      containerToMoveAt: 0,
    };
  }
}
