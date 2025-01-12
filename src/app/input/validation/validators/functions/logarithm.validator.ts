import {TermValidator} from "../../abstracts/validator.abstract";
import {TermValidationMessage} from "../../models/term-validation-message.model";
import {FunctionComponent} from "../../../components/function/function.component";
import {TermWarningMessageData} from "../../../models/char-validation/warning-message-data.model";

export class LogarithmValidator extends TermValidator{

  private readonly baseValue:number
  private readonly argumentValue:number

  constructor(functionComponent:FunctionComponent) {
    super();
    this.baseValue = +functionComponent.baseComponent.toString
    this.argumentValue = +functionComponent.argumentContainer.toString

  }

  protected override getValidationMessages(): TermValidationMessage[] {
    let messages=super.getValidationMessages()

    this.validateArgument(messages)
    if(!isNaN(this.baseValue))
      this.validateBase(messages)

    return messages
  }

  private validateArgument(messages:TermValidationMessage[]){
    this.invalidateArgumentEqualThanZero(messages)
    this.invalidateArgumentLessThanZero(messages)
  }

  private validateBase(messages:TermValidationMessage[]){
    this.invalidateBaseLessOrEqualToOne(messages)
    this.warnBaseEqualToTen(messages)
  }


  private invalidateBaseLessOrEqualToOne(messages:TermValidationMessage[]){
    if(this.baseValue <= 1)
      messages.push({message:"La base de un logaritmo debe de ser un numero positivo distinto de 1.",type:"fully-invalid"})
  }

  private invalidateArgumentLessThanZero(messages:TermValidationMessage[]){
    if(this.argumentValue < 0)
      messages.push({message:"Los logarimos con argumentos negativos devuelven numeros complejos.",type:"fully-invalid"})
  }

  private invalidateArgumentEqualThanZero(messages:TermValidationMessage[]){
    if(this.argumentValue == 0)
      messages.push({message:"No existe exponent que genere 0.",type:"fully-invalid"})
  }

  private warnBaseEqualToTen(messageList:TermWarningMessageData[]){
    if(this.baseValue==10)
      messageList.push({type:'partially-invalid',message:'Aun si no se especifica, 10 es el valor por defecto de la base de un logaritmo.'})
  }

}
