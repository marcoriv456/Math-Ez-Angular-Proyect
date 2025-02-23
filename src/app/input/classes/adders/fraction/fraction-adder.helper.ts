import {Term} from "../../../models/terms/term.model";
import {SpecialCharFinder} from "../../helpers/special-char-finder/special-char-finder.helper";
import {TermAdderInstructions} from "../../../models/actions/term-adder-instructions.model";
import {TermAdder} from "../../../models/term-adder.model";

export class FractionAdder implements TermAdder{
  private readonly origin!:number
  private readonly from!:number
  private readonly to!:number
  private readonly numeratorChars!:Term[]
  private readonly denominatorChars!:Term[]
  constructor(terms:Term[], index:number) {
    this.origin=index+1

    const charFinder=new SpecialCharFinder(index,terms)
    this.from=charFinder.findPrevious()+1
    this.to=charFinder.findNext()

    this.numeratorChars=terms.slice(this.from,this.origin)
    this.denominatorChars=terms.slice(this.origin,this.to)
  }

  public add():TermAdderInstructions{
    return {
      replaceFrom: this.from,
      replaceCount: this.to - this.from,
      term: {
        numeratorChildren: this.numeratorChars,
        denominatorChildren: this.denominatorChars,
        type: 'fraction'
      },
      containerToMoveAt:this.moveTo()
    }
  }

  private moveTo(){
    if(this.numeratorChars.length==0)
      return 0
    if(this.denominatorChars.length==0)
      return 1
    return 'outside'
  }

}
