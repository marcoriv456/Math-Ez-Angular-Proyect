import {TermValidationMessage} from "../../../models/term-validation-message.model";
import {FractionChildComponent} from "../../../../components/fraction/fraction-child/fraction-child.component";
import {TermValidator} from "../../../abstracts/validator.abstract";

export class FractionNumeratorValidator extends TermValidator{
  private readonly numeratorValue:number
  private readonly numeratorStringValue:string

  constructor(numeratorComponent:FractionChildComponent) {
    super();
    this.numeratorStringValue = numeratorComponent.toString
    this.numeratorValue = +this.numeratorStringValue
  }

  protected override getValidationMessages(): TermValidationMessage[] {
    let messages= super.getValidationMessages();

    if(isNaN(this.numeratorValue))
      return messages

    this.warnZeroAsNumerator(messages)

    return messages
  }

  private warnZeroAsNumerator(messages:TermValidationMessage[]){
    if(this.numeratorValue==0 && this.numeratorStringValue!=='')
      messages.push({message:'Cuando el numerador es 0, la fracción siempre resulta igual a 0.',type:'partially-invalid'})
  }
}
