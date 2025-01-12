import {TermValidator} from "../abstracts/validator.abstract";
import {TermValidationMessage} from "../models/term-validation-message.model";
import {VariableProviderService} from "../../services/variable-provider/variable-provider.service";
import {CharComponent} from "../../components/char/char.component";

export class CharValidator extends TermValidator{
  private readonly letterRegex=/^[^0-9+\-*/=()]$/
  private readonly invalidReferenceMessage:TermValidationMessage
  private variableProvider:VariableProviderService

  constructor(
    private charComponent:CharComponent,
  ) {
    super()
    this.invalidReferenceMessage={message:`No se reconoce a la variable "${charComponent.char}"`,type:"fully-invalid"}
    this.variableProvider=charComponent.variableProvider
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
    return this.variableProvider.variableNames.includes(this.charComponent.char)
  }

  private isCharALetter(){
    return this.letterRegex.test(this.charComponent.char)
  }

}
