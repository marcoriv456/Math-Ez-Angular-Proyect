import {Term} from "../../models/terms/term.model";
import {TermAdderInstructions} from "../../models/actions/term-adder-instructions.model";
import {TermAdder} from "../../models/term-adder.model";

export class ExponentAdder implements TermAdder{
  private readonly origin:number
  constructor(index:number) {
    this.origin=index+1

  }

  public add():TermAdderInstructions{
    return {
      replaceFrom:this.origin,
      replaceCount:0,
      term:{type:'exponent', exponentChildren:[]},
      containerToMoveAt:0,
    }
  }

}
