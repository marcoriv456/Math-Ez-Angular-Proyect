import {
  AfterViewChecked,
  Directive,
  ElementRef, HostBinding,
  HostListener,
  inject,
  Input,
  OnChanges, OnDestroy,
  SimpleChanges
} from '@angular/core';
import {InputUtilitiesService} from "../services/caret-positioning/input-utilities.service";
import {InputEditableElement} from "../models/input-editable-element.class";
import {InputCharData} from "../char/char.component";
import {WarningsService} from "../services/warnings/warnings.service";
import {VariableProvider} from "../models/variable-provider.model";
import {VariableProviderService} from "../services/variable-provider/variable-provider.service";

@Directive({
  selector: '[inputTerm]'
})
export class InputTermDirective implements OnChanges,OnDestroy{
  @Input('inputTerm')
  input!:{char:string, index:number,editableElementRef?:InputEditableElement,parent:InputEditableElement}

  ref=inject(ElementRef).nativeElement as HTMLElement
  caretPositioningService=inject(InputUtilitiesService)



  get data():InputCharData{
    return {
      positionX:this.rightPosition,
      positionY:this.topPosition,
      index:this.index,
      size:this.size
    }
  }

  get char(){
    return this.input.char
  }
  get index(){
    return this.input.index
  }
  get asEditableElement(){
    return this.input.editableElementRef
  }
  get parent(){
    return this.input.parent
  }

  @HostListener('click',['$event'])
  onClick(event:MouseEvent){
    event.stopPropagation()
    let {offsetX}=event
    let wasClickOnLeftSide=this.wasClickOnLeftSide(offsetX)
    let dataToSend=this.data
    if(wasClickOnLeftSide){
      dataToSend.positionX=this.leftPosition
      dataToSend.index-=1
    }
    dataToSend.parent=this.parent
    this.caretPositioningService.charClicked.emit(dataToSend)
  }

  private wasClickOnLeftSide(clickOffset:number){
    return this.ref.offsetWidth/2>clickOffset
  }

  ngOnChanges() {
    this.validate();
  }



  private get rightPosition(){
    return this.leftPosition+this.ref.offsetWidth
  }
  private get leftPosition(){
    return this.ref.getBoundingClientRect().left-this.caretPositioningService.inputPositionX
  }
  private get topPosition(){
    return this.ref.getBoundingClientRect().top-this.caretPositioningService.inputPositionY
  }
  private get size(){
    return this.ref.offsetHeight
  }

  // ------------------VARIABLE CHECKING LOGIC------------------
  warningsService=inject(WarningsService)
  warningMessages:WarningMessageData[]=[]
  variableProvider=inject(VariableProviderService)
  valid=true
  @HostBinding('class')
  invalidType:'partially-invalid'|'fully-invalid'|undefined=undefined;
  isMouseOver=false
  @HostListener('mouseover')
  onMouseOver(){
    if(this.valid)
      return;
    this.warningsService.showWarning.emit({messages:this.warningMessages,position:this.data})
    this.isMouseOver=true
  }
  @HostListener('mouseleave')
  onMouseLeave(){
    if(this.valid)
      return;
    this.warningsService.hideWarning.emit()
    this.isMouseOver=false
  }
  ngOnDestroy() {
    if(this.isMouseOver)
      this.warningsService.hideWarning.emit()
  }

  private validate(){
    let validationData:ValidationData={isValid:true}
    if(this.isCharALetter())
      validationData=this.validateChar()
    else if(this.asEditableElement)
      validationData=this.asEditableElement.validate()
    this.setValidationData(validationData)
  }

  private isCharALetter(){
    return /[a-zA-z]/.test(this.char)
  }

  private validateChar():ValidationData{
    let isValid:boolean=this.variableProvider.variableNames.includes(this.char);
    return{
      isValid:isValid,
      type:isValid?undefined:"fully-invalid",
      messages:[{message:`No se encontro a la variable: "${this.char}"`,type:'fully-invalid'}]
    }
  }
  private setValidationData({isValid,type,messages}:ValidationData){
    this.valid=isValid
    this.warningMessages=messages||[]
    this.invalidType=type
  }
  // ------------------VARIABLE CHECKING LOGIC------------------
}

export interface ValidationData{
  isValid:boolean
  type?:'partially-invalid'|'fully-invalid'
  messages?:WarningMessageData[]
}
export interface WarningMessageData{
  message:string
  type?:'partially-invalid'|'fully-invalid'
}
