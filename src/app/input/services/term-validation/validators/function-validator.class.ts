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
    this.validateTenAsLogarithmArgument(term.parent,messageList)
    this.validateLogarithmArgumentGreaterThanOne(term.parent,messageList)
  }

  private validateTenAsLogarithmArgument(termParent:InputEditableElement,messageList:WarningMessageData[]){
    if(termParent.toString=='10' && (termParent.parent as FunctionComponent).functionName=='log')
      messageList.push({type:'partially-invalid',message:'Aun si no se especifica, 10 es el valor por defecto de la base de un logaritmo.'})
  }

  private validateLogarithmArgumentGreaterThanOne(termParent:InputEditableElement,messageList:WarningMessageData[]){
    if((termParent.parent as FunctionComponent).functionName!=='log')
      return;
    let numberParentValue=Number(termParent.toString)
    if(!isNaN(numberParentValue) && !(numberParentValue>1))
      messageList.push({type:'fully-invalid', message:'La base de un logaritmo debe de ser un numero positivo diferente de 1.'})
  }



}
