import {TermValidationMessage} from "../models/term-validation-message.model";
import {TermValidationData} from "../../models/char-validation/validation-data.model";

export abstract class TermValidator {
  protected getValidationMessages():TermValidationMessage[]{
    return []
  }
  public validate():TermValidationData{
    let messages=this.getValidationMessages()
    let isValid=messages.length==0
    let type=isValid?undefined:(messages.find(value => value.type=='fully-invalid')?.type||'partially-invalid')
    return {messages,isValid,type}
  }
}
