import {InputTermDirective} from "../../../directives/input-term.directive";
import {WarningMessageData} from "../../../models/char-validation/warning-message-data.model";

export interface TermValidator{
  pushValidationMessages(term:InputTermDirective,messageList:WarningMessageData[]):void
}
