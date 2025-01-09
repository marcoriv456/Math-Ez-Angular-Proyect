import {Component, ElementRef, HostBinding, inject, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Term} from "../../models/terms/term.model";
import {InputTermDirective} from "../../directives/input-term/input-term.directive";
import {CharClickedNotifierService} from "../../services/char-clicked-notifier/char-clicked-notifier.service";
import {from} from "rxjs";
import {InputCharData} from "../../models/input-char-data.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {TermWarningMessageData} from "../../models/char-validation/warning-message-data.model";
import {InputEditableElement} from "../../directives/input-editable-element/input-editable-element.directive";

@Component({
  selector: 'exp',
  templateUrl: './exponent.component.html',
  styleUrls: ['./exponent.component.css','../../assets/editable-elements-styles.css']
})
export class ExponentComponent extends InputEditableElement{
  @ViewChild(TermContainerComponent)
  termContainer!: TermContainerComponent;

  private zeroExponentRegexp=/^0+$/

  protected override getValidationMessages(): TermWarningMessageData[] {
    let validationMessages=super.getValidationMessages();
    let actualValue=this.toString
    this.validateOneExponent(actualValue,validationMessages)
    this.validateZeroExponent(actualValue,validationMessages)
    return validationMessages
  }

  private validateZeroExponent(actualValue:string, messageList:TermWarningMessageData[]){
    if(this.zeroExponentRegexp.test(actualValue))
      messageList.push({message:'Cualquier valor elevado a 0 es igual a 1.', type:'partially-invalid'})
  }

  private validateOneExponent(actualValue:string, messageList:TermWarningMessageData[]){
    if(actualValue=='1')
      messageList.push({message:'Elevar a la potencia 1 es redundante.', type:'partially-invalid'})
  }
}
