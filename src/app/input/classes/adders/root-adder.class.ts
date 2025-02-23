import {TermAdder} from "../../models/term.adder";
import {TermAdderInstructions} from "../../models/actions/term-adder-instructions.model";

export class RootAdder implements TermAdder {
  constructor(private index: number) {
  }

  add(): TermAdderInstructions {
    return {
      replaceFrom: this.index + 1,
      term: {type: 'root', rootChildren: []},
      replaceCount: 0,
      containerToMoveAt: 0
    }
  }
}
