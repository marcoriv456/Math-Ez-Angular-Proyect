import {Component, ElementRef, HostBinding, inject, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {InputEditableElement} from "../../classes/input-editable-element.class";
import {InputUtilitiesService} from "../../services/caret-positioning/input-utilities.service";
import {InputTermDirective} from "../../directives/input-term.directive";
import {Term} from "../../models/terms/term.model";
import {InputCharData} from "../../models/input-char-data.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {EditableTermContainerComponent} from "../editable-term-container/editable-term-container.component";
import {TermArgumentComponent} from "../term-argument/term-argument.component";
import {ValidationData} from "../../models/char-validation/validation-data.model";
import {WarningMessageData} from "../../models/char-validation/warning-message-data.model";

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css','../../assets/editable-elements-styles.css']
})
export class RootComponent extends InputEditableElement{
  @ViewChild(TermContainerComponent)
  termContainer!: TermContainerComponent;

  @ViewChildren(InputTermDirective)
  _renderedChars!:QueryList<InputTermDirective>

  @Input()
  radicalTerms?:Term[]

  override editable=false

  @ViewChild('rootMainContainer')
  mainComponent!:EditableTermContainerComponent
  @ViewChild('rootArgument')
  argumentComponent!:TermArgumentComponent

  override get renderedChars(): QueryList<InputTermDirective> {
    return this._renderedChars;
  }
  protected override getValidationMessages(): WarningMessageData[] {
    let messages:WarningMessageData[]=[]
    this.validateOneAsRootValue(messages)
    if(this.radicalTerms)
      this.validateOneAsRadical(messages)
    return messages;
  }

  private validateOneAsRootValue(messageList:WarningMessageData[]) {
    if(this.mainComponent.toString=='1')
      messageList.push({message:'La raiz de cualquier radical de 1 siempre sera 1.',type:'partially-invalid'})
  }
  private validateOneAsRadical(messageList: WarningMessageData[]) {
    if(this.argumentComponent.toString=='1')
      messageList.push({message:'No se puede agregar 1 como radical de una raiz.',type:'fully-invalid'})
  }
}

