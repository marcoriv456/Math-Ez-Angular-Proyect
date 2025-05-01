import {TermValidationMessage} from "../../../models/term-validation-message.model";
import {TermValidator} from "../../../abstracts/validator.abstract";
import {Term} from "../../../../models/terms/term.model";
import {TermUtils} from "../../../../classes/term-utils.util";
import {UnexpectedTermTypeError} from "../../../errors/unexpected-term-type.error";

export class FractionDenominatorValidator extends TermValidator{
  denominatorValue:number
  denominatorStringValue:string
  constructor(term:Term) {
    super()
    if(term.type!=='fraction')
      throw new UnexpectedTermTypeError("fraction",term.type)

    this.denominatorStringValue = TermUtils.toString(term.denominatorChildren)
    this.denominatorValue = +this.denominatorStringValue
  }

  protected override getValidationMessages(): TermValidationMessage[] {
    let messages=  super.getValidationMessages();

    if(isNaN(this.denominatorValue))
      return messages

    this.warnOneAsDenominator(messages)
    this.invalidateZeroAsDenominator(messages)

    return messages
  }

  private warnOneAsDenominator(messages:TermValidationMessage[]){
    if(this.denominatorValue==1)
      messages.push({message:'Tener "1" como denominador es redundante.', type:'partially-invalid'})
  }

  private invalidateZeroAsDenominator(messages:TermValidationMessage[]){
    if(this.denominatorValue==0 && this.denominatorStringValue!=="")
      messages.push({message:"Cualquier division entre 0 esta indefinida.",type:'fully-invalid'})
  }
}
