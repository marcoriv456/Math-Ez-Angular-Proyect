import {TermValidator} from "./term-validator.model";
import {InputTermDirective} from "../../../directives/input-term.directive";
import {WarningMessageData} from "../../../models/char-validation/warning-message-data.model";
import {InputEditableElement} from "../../../models/input-editable-element.class";
import {FractionComponent} from "../../../components/fraction/fraction.component";
import {FractionChildComponent} from "../../../components/fraction/fraction-child/fraction-child.component";

export class FractionValidator implements TermValidator{
  private zeroTermRegexp=/^0+$/
  pushValidationMessages(term: InputTermDirective, messageList: WarningMessageData[]) {
    if(!this.isTermParentAFractionChild(term.parent))
      return;
    this.validateDivisionByZero(term.parent.toString,messageList)
  }

  private isTermParentAFractionChild(termParent:InputEditableElement){
    return termParent instanceof FractionChildComponent
  }

  private validateDivisionByZero(parentValue:string,messageList:WarningMessageData[]){
    if(this.zeroTermRegexp.test(parentValue))
      messageList.push({message:'No se puede dividir por 0.', type:'partially-invalid'})
  }
}
