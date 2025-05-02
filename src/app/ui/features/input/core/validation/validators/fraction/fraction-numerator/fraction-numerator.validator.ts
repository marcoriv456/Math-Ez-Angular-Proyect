import {Term} from "../../../../models/terms/term.model";
import {TermUtils} from "../../../../../classes/term-utils.util";
import {TermValidator} from "../../../abstracts/validator.abstract";
import {UnexpectedTermTypeError} from "../../../errors/unexpected-term-type.error";
import {TermValidationMessage} from "../../../models/term-validation-message.model";

export class FractionNumeratorValidator extends TermValidator{
  private readonly numeratorValue:number
  private readonly numeratorStringValue:string

  constructor(term:Term) {
    super();
    if(term.type!=='fraction')
      throw new UnexpectedTermTypeError("fraction",term.type)

    this.numeratorStringValue = TermUtils.toString(term.numeratorChildren)
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
