import {Term} from "../../../models/terms/term.model";
import {TermRemoverInstructions} from "../../../models/term-remover-instructions.model";

export class OutsideTermRemover{
  constructor(private terms:Term[], private index:number){}

  public remove():TermRemoverInstructions{
    if(this.terms[this.index].type=='parenthesis')
      return this.deleteParenthesis()
    else
      return this.deleteSimpleChars()
  }

  private deleteParenthesis(): TermRemoverInstructions{
    const parenthesis=this.terms[this.index]
    if (parenthesis.type!=='parenthesis')
      throw new Error("Misplaced type. Provided term is not a parenthesis.")

    const terms:Term[]=[{type:'char',char:'('},...parenthesis.parenthesisChildren]
    return {
      index: this.index,
      count:1,
      remainingTerms: terms,
      moveTo:this.index+terms.length-1
    }
  }

  private deleteSimpleChars():TermRemoverInstructions{
    return {
      index: this.index,
      moveTo:this.index-1,
      count:1
    }
  }
}
