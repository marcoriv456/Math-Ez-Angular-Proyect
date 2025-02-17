import {RootComponent} from "../../../components/root/root.component";
import {TermValidator} from "../../abstracts/validator.abstract";
import {TermValidationMessage} from "../../models/term-validation-message.model";
import {Term} from "../../../models/terms/term.model";
import {UnexpectedTermTypeError} from "../../errors/unexpected-term-type.error";
import {TermUtils} from "../../../classes/term-utils";

export class RootValidator extends TermValidator{
  private readonly radicandValue:number
  private readonly indexValue:number|undefined
  private readonly indexStringValue:string|undefined
  constructor(
    term:Term
  ) {
    super()
    if(term.type!=='root')
      throw new UnexpectedTermTypeError("root",term.type)

    this.indexStringValue = TermUtils.toString(term.radicalTerms||[])
    this.radicandValue = +TermUtils.toString(term.rootChildren)
    this.indexValue = +this.indexStringValue
  }

  protected override getValidationMessages(): TermValidationMessage[] {
    let messages:TermValidationMessage[]=[]
    if(!isNaN(this.radicandValue))
      this.validateRadicandValue(messages)

    if(this.indexValue!==undefined&&!isNaN(this.indexValue))
      this.validateIndexValue(messages)

    return messages;
  }

  private validateRadicandValue(messages:TermValidationMessage[]) {
    this.warnOneAsRadicandValue(messages)
    this.invalidateNegativeRadicandAndOddIndex(messages)
  }

  private validateIndexValue(messages:TermValidationMessage[]) {
    this.invalidateOneAsIndexValue(messages)
    this.invalidateZeroAsIndexValue(messages)
  }


  private invalidateNegativeRadicandAndOddIndex(messages:TermValidationMessage[]){
    if(this.radicandValue < 0 && (this.indexValue && this.indexValue%2==0  || this.indexStringValue==""))
      messages.push({message:'La raiz de un numero negativo con indice par dara un numero complejo.', type:'fully-invalid'})
  }

  private warnOneAsRadicandValue(messages:TermValidationMessage[]) {
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
