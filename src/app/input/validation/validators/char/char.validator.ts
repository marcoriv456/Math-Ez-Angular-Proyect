import {TermValidator} from "../../abstracts/validator.abstract";
import {TermValidationMessage} from "../../models/term-validation-message.model";
import {VariableProviderService} from "../../../services/variable-provider/variable-provider.service";
import {CharComponent} from "../../../components/char/char.component";
import {Term} from "../../../models/terms/term.model";
import {CharTerm} from "../../../models/terms/char-term.model";
import {VariableProvider} from "../../../models/variable-provider.model";
import {UnexpectedTermTypeError} from "../../errors/unexpected-term-type.error";

export class CharValidator extends TermValidator{

  private static readonly letterRegex=/^[^0-9+\-*=() ]$/
  private static variableProvider:VariableProviderService

  public static setVariableProvider(variableProvider:VariableProviderService){
    if(!this.variableProvider)
      this.variableProvider=variableProvider
  }

  private readonly char:string
  private readonly invalidReferenceMessage:TermValidationMessage

  constructor(charTerm:Term) {
    super()
    if(charTerm.type!=='char')
      throw new UnexpectedTermTypeError('char',charTerm.type)

    this.char=charTerm.char
    this.invalidReferenceMessage={message:`No se reconoce a la variable "${charTerm.char}"`,type:"fully-invalid"}
  }

  protected override getValidationMessages(): TermValidationMessage[] {
    let messages=super.getValidationMessages()
    if(!this.isCharALetter())
      return messages;

    if(!this.isVariableReferenceValid())
      messages.push(this.invalidReferenceMessage)

    return messages
  }

  private isVariableReferenceValid(){
    return CharValidator.variableProvider.variableNames.includes(this.char)
  }

  private isCharALetter(){
    return CharValidator.letterRegex.test(this.char)
  }

}
