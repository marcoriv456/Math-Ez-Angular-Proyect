import {TermValidator} from "./term-validator.model";
import {InputTermDirective} from "../../../directives/input-term.directive";
import {WarningMessageData} from "../../../models/char-validation/warning-message-data.model";
import {InputEditableElement} from "../../../models/input-editable-element.class";
import {
  EditableTermContainerComponent
} from "../../../components/editable-term-container/editable-term-container.component";
import {FunctionComponent} from "../../../components/function/function.component";
import {TermArgumentComponent} from "../../../components/term-argument/term-argument.component";

export class FunctionValidator implements TermValidator{
  pushValidationMessages(term: InputTermDirective, messageList: WarningMessageData[]) {
    if(this.isTermParentAFunctionArgument(term.parent))
      this.pushArgumentValidationMessages(term,messageList)

  }

  private isTermParentAFunctionArgument(termParent:InputEditableElement){
    return termParent instanceof TermArgumentComponent && termParent.parent instanceof FunctionComponent;
  }

  private pushArgumentValidationMessages(term:InputTermDirective, messageList: WarningMessageData[]) {
    this.validateTenAsLogarithmArgument(term,messageList)
  }

  private validateTenAsLogarithmArgument(term:InputTermDirective,messageList:WarningMessageData[]){
    if(term.parent.toString=='10' && (term.parent.parent as FunctionComponent).functionName=='log')
      messageList.push({type:'partially-invalid',message:'10 es el valor por defecto del argumento de un logaritmo.'})
  }


}
