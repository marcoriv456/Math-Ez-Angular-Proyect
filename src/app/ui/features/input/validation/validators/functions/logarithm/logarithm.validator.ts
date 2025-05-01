import {TermValidator} from "../../../abstracts/validator.abstract";
import {TermValidationMessage} from "../../../models/term-validation-message.model";
import {FunctionComponent} from "../../../../components/function/function.component";
import {Term} from "../../../../models/terms/term.model";
import {UnexpectedTermTypeError} from "../../../errors/unexpected-term-type.error";
import {TermUtils} from "../../../../classes/term-utils.util";

export class LogarithmValidator extends TermValidator{

  private readonly baseValue:number
  private readonly argumentValue:number
  private readonly baseStringValue:string
  private readonly argumentStringValue:string

  constructor(term:Term) {
    super();
    if (term.type!=='function' || term.functionName!=='log')
      throw new UnexpectedTermTypeError("log function",`${term.type=='function' ? term.functionName:''} ${term.type}`)

    this.baseStringValue = TermUtils.toString(term.argumentTerms||[])
    this.argumentStringValue = TermUtils.toString(term.functionChildren)
    this.baseValue = +this.baseStringValue
    this.argumentValue = +this.argumentStringValue
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
    if(this.baseValue <= 1 && this.baseStringValue!=='')
      messages.push({message:"La base de un logaritmo debe de ser un numero positivo distinto de 1.",type:"fully-invalid"})
  }

  private invalidateArgumentLessThanZero(messages:TermValidationMessage[]){
    if(this.argumentValue < 0)
      messages.push({message:"Los logarimos con argumentos negativos devuelven numeros complejos.",type:"fully-invalid"})
  }

  private invalidateArgumentEqualThanZero(messages:TermValidationMessage[]){
    if(this.argumentValue == 0 && this.argumentStringValue!=='')
      messages.push({message:"No existe exponente que genere 0.",type:"fully-invalid"})
  }

  private warnBaseEqualToTen(messageList:TermValidationMessage[]){
    if(this.baseValue==10)
      messageList.push({type:'partially-invalid',message:'Aun si no se especifica, 10 es el valor por defecto de la base de un logaritmo.'})
  }

}
