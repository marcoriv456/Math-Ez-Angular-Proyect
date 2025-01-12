import {RootComponent} from "../../components/root/root.component";
import {TermValidator} from "../abstracts/validator.abstract";
import {TermValidationMessage} from "../models/term-validation-message.model";

export class RootValidator extends TermValidator{
  private readonly radicandValue:number
  private readonly indexValue:number
  private readonly indexStringValue:string
  constructor(
    rootComponent:RootComponent
  ) {
    super()
    this.indexStringValue = rootComponent.indexComponent.toString
    this.radicandValue = +rootComponent.radicandComponent.toString
    this.indexValue = +this.indexStringValue
  }

  protected override getValidationMessages(): TermValidationMessage[] {
    let messages:TermValidationMessage[]=[]
    if(!isNaN(this.radicandValue))
      this.validateRadicandValue(messages)

    if(!isNaN(this.indexValue))
      this.validateIndexValue(messages)

    return messages;
  }

  private validateRadicandValue(messages:TermValidationMessage[]) {
    this.invalidateOneAsRadicandValue(messages)
    this.invalidateNegativeRadicandAndOddIndex(messages)
  }

  private validateIndexValue(messages:TermValidationMessage[]) {
    this.invalidateOneAsIndexValue(messages)
    this.invalidateZeroAsIndexValue(messages)
  }


  private invalidateNegativeRadicandAndOddIndex(messages:TermValidationMessage[]){
    if(this.radicandValue < 0 && (this.indexValue%2==0  || this.indexStringValue==""))
      messages.push({message:'La raiz de un numero negativo con indice par dara un numero complejo.', type:'fully-invalid'})
  }

  private invalidateOneAsRadicandValue(messages:TermValidationMessage[]) {
    if(this.radicandValue==1)
      messages.push({message:'La raiz de cualquier indice de 1 siempre sera 1.',type:'partially-invalid'})
  }

  private invalidateOneAsIndexValue(messages: TermValidationMessage[]) {
    if(this.indexValue==1)
      messages.push({message:'No se puede agregar 1 como indice de una raiz.',type:'fully-invalid'})
  }

  private invalidateZeroAsIndexValue(messages:TermValidationMessage[]) {
    if(this.indexValue==0 && this.indexStringValue!=='')
      messages.push({message:'No se puede agregar 0 como indice de una raiz.',type:'fully-invalid'})
  }

}
