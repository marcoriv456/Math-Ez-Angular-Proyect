import {TermValidator} from "./term-validator.model";
import {InputTermDirective} from "../../../directives/input-term.directive";
import {WarningMessageData} from "../../../models/char-validation/warning-message-data.model";
import {InputEditableElement} from "../../../models/input-editable-element.class";
import {TermArgumentComponent} from "../../../components/term-argument/term-argument.component";
import {RootComponent} from "../../../components/root/root.component";
import {
  EditableTermContainerComponent
} from "../../../components/editable-term-container/editable-term-container.component";

export class RootValidator implements TermValidator{
  pushValidationMessages(term: InputTermDirective, messageList: WarningMessageData[]) {
    if(this.isTermParentARootRadical(term.parent))
      this.pushRadicalValidationMessages(term,messageList)
    else if(this.isTermParentTheMainRootContainer(term.parent))
      this.pushRootValidationMessages(term,messageList)
  }
  private isTermParentARootRadical(termParent:InputEditableElement){
    return termParent instanceof TermArgumentComponent && termParent.parent instanceof RootComponent;
  }
  private pushRadicalValidationMessages(term: InputTermDirective, messageList: WarningMessageData[]) {
    this.validateOneAsRadical(term.parent.toString,messageList)
  }
  private validateOneAsRadical(parentValue:string, messageList: WarningMessageData[]) {
    if(parentValue=='1')
      messageList.push({message:'No se puede agregar 1 como radical de una raiz.',type:'fully-invalid'})
  }

  private isTermParentTheMainRootContainer(termParent:InputEditableElement){
    return termParent instanceof EditableTermContainerComponent && termParent.parent instanceof RootComponent
  }
  private pushRootValidationMessages(term:InputTermDirective,messageList:WarningMessageData[]){
    this.validateOneAsRootValue(term.parent.toString,messageList)
  }
  private validateOneAsRootValue(parentValue:string, messageList:WarningMessageData[]) {
    if(parentValue=='1')
      messageList.push({message:'La raiz de cualquier radical de 1 siempre sera 1.',type:'partially-invalid'})
  }

}
