import {Term} from "../../models/terms/term.model";
import {SpecialCharFinder} from "../helpers/special-char-finder/special-char-finder.helper";
import {FractionAdderInstructions} from "../../models/fraction-adder-instructions.model";

export class FractionAdder{
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

  public add():FractionAdderInstructions{
    return {
      replaceFrom: this.from,
      replaceTo: this.to - this.from,
      fraction: {
        numeratorChildren: this.numeratorChars,
        denominatorChildren: this.denominatorChars,
        type: 'fraction'
      },
      moveTo:this.moveTo()
    }
  }

  private moveTo(){
    if(this.numeratorChars.length==0)
      return 'numerator'
    if(this.denominatorChars.length==0)
      return 'denominator'
    return 'outside'
  }

}
