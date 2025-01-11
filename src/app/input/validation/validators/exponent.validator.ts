import {TermWarningMessageData} from "../../models/char-validation/warning-message-data.model";
import {TermValidator} from "../abstracts/validator.abstract";
import {TermValidationMessage} from "../models/term-validation-message.model";
import {ExponentComponent} from "../../components/exponent/exponent.component";

export class ExponentValidator extends TermValidator{
  private readonly actualExponentValue:number

  constructor(
    exponentComponent:ExponentComponent
  ) {
    super();
    this.actualExponentValue = +exponentComponent.toString
  }

  protected override getValidationMessages(): TermValidationMessage[] {
    let validationMessages=super.getValidationMessages();

    if(!this.actualExponentValue)
      return validationMessages

    this.validateOneExponent(validationMessages)
    this.validateZeroExponent(validationMessages)

    return validationMessages
  }

  private validateZeroExponent(messageList:TermWarningMessageData[]){
    if(this.actualExponentValue==0)
      messageList.push({message:'Cualquier valor elevado a 0 es igual a 1.', type:'partially-invalid'})
  }

  private validateOneExponent(messageList:TermWarningMessageData[]){
    if(this.actualExponentValue==1)
      messageList.push({message:'Elevar a la potencia 1 es redundante.', type:'partially-invalid'})
  }

}
