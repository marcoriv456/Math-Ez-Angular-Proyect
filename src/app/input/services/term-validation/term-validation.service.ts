import {Injectable} from '@angular/core';
import {InputTermDirective} from "../../directives/input-term.directive";
import {WarningMessageData} from "../../models/char-validation/warning-message-data.model";
import {ValidationData} from "../../models/char-validation/validation-data.model";
import {CharValidator} from "./validators/char-validator.class";
import {TermValidator} from "./validators/term-validator.model";
import {FractionValidator} from "./validators/fraction-validator.class";
import {ExponentValidator} from "./validators/exponent-validator.class";

@Injectable()
export class TermValidationService{
  constructor() { }
  private validators:TermValidator[]=[
    new CharValidator(),
    new FractionValidator(),
    new ExponentValidator()
  ]

  validateTerm(term:InputTermDirective):ValidationData{
    let messages=this.getValidationMessages(term)
    let isValid=messages.length==0
    let type=isValid?undefined:(messages.find(value => value.type=='fully-invalid')?.type||'partially-invalid')
    return{isValid, messages, type}
  }

  private getValidationMessages(term:InputTermDirective):WarningMessageData[]{
    let messages:WarningMessageData[]=[]
    for (let validator of this.validators)
      validator.pushValidationMessages(term,messages)
    return messages
  }
}

