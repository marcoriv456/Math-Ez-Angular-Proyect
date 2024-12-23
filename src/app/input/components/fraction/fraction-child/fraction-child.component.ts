import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  Output,
  QueryList, ViewChild,
  ViewChildren
} from '@angular/core';
import {InputCharData} from "../../../models/input-char-data.model";
import {InputEditableElement} from "../../../models/input-editable-element.class";
import {TermContainerComponent} from "../../term-container/term-container.component";
import {WarningMessageData} from "../../../models/char-validation/warning-message-data.model";

@Component({
  selector: 'frac-child',
  templateUrl: './fraction-child.component.html',
  styleUrls: ['./fraction-child.component.css','../../../assets/editable-elements-styles.css']
})
export class FractionChildComponent extends InputEditableElement implements AfterViewInit{
  @ViewChild(TermContainerComponent)
  termContainer!: TermContainerComponent;

  @Output()
  termDeleted=new EventEmitter<void>
  @Input()
  type!:'numerator'|'denominator'


  cdr=inject(ChangeDetectorRef)

  override removeChars(from: number, deleteCount: number = 1): InputCharData|undefined {
    if(this.terms.length)
      return this.removeSimpleChar(from, deleteCount);
    this.termDeleted.emit()
    return;
  }

  ngAfterViewInit() {
    this.updateTermsValidation()
  }
  override get noCharData(): InputCharData {
    let data=super.noCharData
    this.cdr.detectChanges()
    data.positionX = this.terms.length==0 ?
      data.positionX+this.ref.offsetWidth/2 : (this.renderedChars.get(0)?.leftPosition||0)
    return data
  }

  private zeroTermRegexp=/^0+$/

  protected override getValidationMessages(): WarningMessageData[] {
    let validationMessages= super.getValidationMessages();
    let actualValue=this.toString
    this.validateDivisionByZero(actualValue,validationMessages)
    if(this.type=='denominator')
      this.validateOneAsDenominator(actualValue,validationMessages)
    return validationMessages
  }

  private validateDivisionByZero(actualValue:string,messageList:WarningMessageData[]){
    if(this.zeroTermRegexp.test(this.toString))
      messageList.push({message:'No se puede dividir por 0.', type:'partially-invalid'})
  }
  private validateOneAsDenominator(actualValue:string,messageList:WarningMessageData[]){
    if(actualValue=='1')
      messageList.push({message:'Tener "1" como denominador es redundante.', type:'partially-invalid'})
  }
}
