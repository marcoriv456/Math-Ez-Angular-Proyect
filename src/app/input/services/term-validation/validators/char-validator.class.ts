import {TermValidator} from "./term-validator.model";
import {InputTermDirective} from "../../../directives/input-term.directive";
import {WarningMessageData} from "../../../models/char-validation/warning-message-data.model";
import {inject} from "@angular/core";
import {VariableProviderService} from "../../variable-provider/variable-provider.service";

export class CharValidator implements TermValidator{
  constructor() {}
  private letterRegexp=/^[a-zA-z]$/
  private variableProvider=inject(VariableProviderService)

  pushValidationMessages(term: InputTermDirective, messageList: WarningMessageData[]) {
    if(!this.isCharALetter(term.char))
      return;
    this.validateVariableReference(term.char,messageList)
  }

  private isCharALetter(char:string){
    return this.letterRegexp.test(char)
  }

  private validateVariableReference(char:string, messageList: WarningMessageData[]) {
    if(!this.variableProvider.variableNames.includes(char))
      messageList.push({ message:`No se encontro a la variable: "${char}"`,type:'fully-invalid'})
  }
}
