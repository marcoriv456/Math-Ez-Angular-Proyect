import {Component, ElementRef, HostBinding, inject, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {CharClickedNotifierService} from "../../services/char-clicked-notifier/char-clicked-notifier.service";
import {InputTermDirective} from "../../directives/input-term/input-term.directive";
import {Term} from "../../models/terms/term.model";
import {InputCharData} from "../../models/input-char-data.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {EditableTermContainerComponent} from "../editable-term-container/editable-term-container.component";
import {TermWarningMessageData} from "../../models/char-validation/warning-message-data.model";
import {InputEditableElement} from "../../directives/input-editable-element/input-editable-element.directive";

@Component({
  selector: 'function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css','../../assets/editable-elements-styles.css']
})
export class FunctionComponent extends InputEditableElement{
  @ViewChild(TermContainerComponent)
  termContainer!: TermContainerComponent;

  @Input()
  functionName!:string
  @ViewChild('functionNameLabel')
  functionNameLabel!:ElementRef
  @Input()
  argumentTerms?:Term[]
  override editable=false
  @ViewChildren(InputTermDirective)
  _renderedChars!:QueryList<InputTermDirective>;
  override get renderedChars(): QueryList<InputTermDirective> {
    return this._renderedChars
  }
  @ViewChild('functionMainContainer')
  mainContainer!:EditableTermContainerComponent
  @ViewChild('functionArgument')
  argumentComponent!:EditableTermContainerComponent

  protected override getValidationMessages(): TermWarningMessageData[] {
    let validationMessages=super.getValidationMessages();
    if(this.functionName=='log')
      this.executeLogarithmValidations(validationMessages)
    return validationMessages
  }

  private executeLogarithmValidations(messageList:TermWarningMessageData[]){
    let argumentValue=this.argumentComponent.toString
    this.validateTenAsLogarithmArgument(argumentValue,messageList)
    this.validateLogarithmArgumentGreaterThanOne(argumentValue,messageList)
  }

  private validateTenAsLogarithmArgument(argumentValue:string,messageList:TermWarningMessageData[]){
    if(argumentValue=='10')
      messageList.push({type:'partially-invalid',message:'Aun si no se especifica, 10 es el valor por defecto de la base de un logaritmo.'})
  }

  private validateLogarithmArgumentGreaterThanOne(argumentValue:string,messageList:TermWarningMessageData[]){
    let numberParentValue=Number(argumentValue)
    if(!isNaN(numberParentValue) && !(numberParentValue>1))
      messageList.push({type:'fully-invalid', message:'La base de un logaritmo debe de ser un numero positivo diferente de 1.'})
  }
}

