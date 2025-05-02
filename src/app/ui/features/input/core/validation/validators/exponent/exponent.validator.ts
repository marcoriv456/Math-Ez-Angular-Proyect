import {ExponentComponent} from "../../../../ui/terms/exponent/exponent.component";
import {Term} from "../../../models/terms/term.model";
import {TermUtils} from "../../../utils/term-utils.util";
import {TermValidator} from "../../abstracts/validator.abstract";
import {UnexpectedTermTypeError} from "../../errors/unexpected-term-type.error";
import {TermValidationMessage} from "../../models/term-validation-message.model";

export class ExponentValidator extends TermValidator{
  private readonly exponentValue:number
  private readonly exponentStringValue:string

  constructor(term:Term) {
    super();
    if(term.type!=="exponent")
      throw new UnexpectedTermTypeError("exponent",term.type)

    this.exponentStringValue=TermUtils.toString(term.exponentChildren)
    this.exponentValue = +this.exponentStringValue
  }

  protected override getValidationMessages(): TermValidationMessage[] {
    let validationMessages=super.getValidationMessages();

    if(isNaN(this.exponentValue))
      return validationMessages

    this.validateOneExponent(validationMessages)
    this.validateZeroExponent(validationMessages)

    return validationMessages
  }

  private validateZeroExponent(messageList:TermValidationMessage[]){
    if(this.exponentValue==0 && this.exponentStringValue!=='')
      messageList.push({message:'Cualquier valor elevado a 0 es igual a 1.', type:'partially-invalid'})
  }

  private validateOneExponent(messageList:TermValidationMessage[]){
    if(this.exponentValue==1)
      messageList.push({message:'Elevar a la potencia 1 es redundante.', type:'partially-invalid'})
  }

}
