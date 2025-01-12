import {TermValidationMessage} from "./term-validation-message.model";

export interface WarningRenderData{
  messages:TermValidationMessage[]
  position:{x:number, y:number}
}
