import {FractionChildComponent} from "../../../components/fraction/fraction-child/fraction-child.component";
import {TermValidationMessage} from "../../models/term-validation-message.model";
import {FractionChildValidator} from "./fraction-child.validator";

export class FractionDenominatorValidator extends FractionChildValidator{
  denominatorValue:number
  constructor(denominatorComponent:FractionChildComponent) {
    super()
    this.denominatorValue = +denominatorComponent.toString
  }

  protected override getValidationMessages(): TermValidationMessage[] {
    let messages=  super.getValidationMessages();

    if(!this.validationControl || !this.denominatorValue)
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
    if(this.denominatorValue==0)
      messages.push({message:"Cualquier division entre 0 esta indefinida.",type:'fully-invalid'})
  }
}
