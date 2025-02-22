import {Term} from "../../../models/terms/term.model";
import {TermRemoverInstructions} from "../../../models/term-remover-instructions.model";
import {FractionTerm} from "../../../models/terms/fraction-term.model";

export class InsideTermRemover{
  constructor(
    private terms:Term[],
    private parentTerm:Term,
    private containerIndex:number,
    private mathElementIndex:number){ }

  public remove(count=1):TermRemoverInstructions{
    if(this.parentTerm.type=='fraction')
      return this.removeFraction(this.parentTerm)

    return {
      index:this.mathElementIndex,
      moveTo:this.mathElementIndex-1,
      remainingTerms:this.terms,
      count
    }
  }

  private removeFraction(term:FractionTerm):TermRemoverInstructions{
    const {numeratorChildren,denominatorChildren}=term
    const remainingTerms=[...numeratorChildren,...denominatorChildren]

    let moveTo=this.mathElementIndex-1

    const isContainerADenominator = this.containerIndex==1
    if(isContainerADenominator)
      moveTo+=numeratorChildren.length

    return {index:this.mathElementIndex, count:1, remainingTerms, moveTo}
  }
}
