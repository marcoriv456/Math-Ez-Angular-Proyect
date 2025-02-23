import {TermRemover} from "../../../models/term-remover.model";
import {Term} from "../../../models/terms/term.model";
import {TermRemoverInstructions} from "../../../models/actions/term-remover-instructions.model";
import {SpecialCharFinder} from "../../helpers/special-char-finder/special-char-finder.helper";

export class CtrlRemover implements TermRemover{

  private readonly count:number;
  private readonly prevIrregularCharIndex:number;

  constructor(terms:Term[], indexToSearchAt:number){
    const finder=new SpecialCharFinder(indexToSearchAt,terms)
    const prevIrregularCharIndex=finder.findPreviousIndexToMoveAt()+1

    this.prevIrregularCharIndex=prevIrregularCharIndex
    this.count = indexToSearchAt - prevIrregularCharIndex + 1

    if(this.prevIrregularCharIndex == -1)
      this.prevIrregularCharIndex=0
  }

  public remove():TermRemoverInstructions{
    return {
      index:this.prevIrregularCharIndex,
      count:this.count,
      moveTo:this.prevIrregularCharIndex-1
    }
  }
}
