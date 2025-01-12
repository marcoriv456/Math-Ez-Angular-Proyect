import {TermValidator} from "../abstracts/validator.abstract";
import {TermValidationMessage} from "../models/term-validation-message.model";
import {ExponentComponent} from "../../components/exponent/exponent.component";

export class ExponentValidator extends TermValidator{
  private readonly value:number
  private readonly stringValue:string
  constructor(
    exponentComponent:ExponentComponent
  ) {
    super();
    this.stringValue=exponentComponent.toString
    this.value = +this.stringValue
  }

  protected override getValidationMessages(): TermValidationMessage[] {
    let validationMessages=super.getValidationMessages();

    if(isNaN(this.value))
      return validationMessages

    this.validateOneExponent(validationMessages)
    this.validateZeroExponent(validationMessages)

    return validationMessages
  }

  private validateZeroExponent(messageList:TermValidationMessage[]){
    if(this.value==0 && this.stringValue!=='')
      messageList.push({message:'Cualquier valor elevado a 0 es igual a 1.', type:'partially-invalid'})
  }

  private validateOneExponent(messageList:TermValidationMessage[]){
    if(this.value==1)
      messageList.push({message:'Elevar a la potencia 1 es redundante.', type:'partially-invalid'})
  }

}
