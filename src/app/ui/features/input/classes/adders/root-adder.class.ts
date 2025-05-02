import {TermAdder} from "../../core/models/term-adder.model";
import {TermAdderInstructions} from "../../core/models/actions/term-adder-instructions.model";

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
