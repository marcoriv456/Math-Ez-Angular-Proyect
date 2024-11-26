import {TermValidator} from "./term-validator.model";
import {InputTermDirective} from "../../../directives/input-term.directive";
import {WarningMessageData} from "../../../models/char-validation/warning-message-data.model";
import {InputEditableElement} from "../../../models/input-editable-element.class";
import {ExponentComponent} from "../../../components/exponent/exponent.component";

export class ExponentValidator implements TermValidator{
  private zeroExponentRegexp=/^0+$/
  pushValidationMessages(term: InputTermDirective, messageList: WarningMessageData[]) {
    if(!this.isTermParentAnExponent(term.parent))
      return;
    this.validateZeroExponent(term.parent.toString,messageList)
    this.validateOneExponent(term.parent.toString,messageList)
  }

  private isTermParentAnExponent(termParent:InputEditableElement){
    return termParent instanceof ExponentComponent
  }

  private validateZeroExponent(parentValue:string, messageList:WarningMessageData[]){
    if(this.zeroExponentRegexp.test(parentValue))
      messageList.push({message:'Cualquier valor elevado a 0 es igual a 1.', type:'partially-invalid'})
  }
  private validateOneExponent(parentValue:string, messageList:WarningMessageData[]){
    if(parentValue=='1')
      messageList.push({message:'Elevar a la potencia 1 es redundante.', type:'partially-invalid'})
  }
}
