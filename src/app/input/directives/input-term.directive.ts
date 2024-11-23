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
import {WarningsService} from "../services/warnings/warnings.service";
import {VariableProvider} from "../models/variable-provider.model";
import {VariableProviderService} from "../services/variable-provider/variable-provider.service";
import {FractionComponent} from "../fraction/fraction.component";
import {FractionChildComponent} from "../fraction/fraction-child/fraction-child.component";
import {ExponentComponent} from "../power/exponent.component";
import {ValidationData} from "../models/char-validation/validation-data.model";
import {WarningMessageData} from "../models/char-validation/warning-message-data.model";
import {InputCharData} from "../models/input-char-data.model";
import {InputComponent} from "../input.component";

@Directive({
  selector: '[inputTerm]'
})
export class InputTermDirective implements OnDestroy{
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

  private get rightPosition(){
    return this.leftPosition+this.ref.offsetWidth
  }
  private get leftPosition(){
    let parent:HTMLElement|null=this.ref.parentElement
    let leftPosition=this.ref.offsetLeft
    while(parent && !(parent.tagName=='APP-INPUT')){
      leftPosition+=parent.offsetLeft||0
      parent=parent.parentElement
    }
    return leftPosition
  }
  private get topPosition(){
    return this.ref.getBoundingClientRect().top-this.caretPositioningService.inputPositionY
  }
  private get size(){
    return this.ref.offsetHeight
  }

  private get absoluteLeftPosition(){
    return this.ref.getBoundingClientRect().left-this.caretPositioningService.inputPositionX
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
    let dataToSend=this.data
    dataToSend.positionX=this.absoluteLeftPosition
    this.warningsService.showWarning.emit({messages:this.warningMessages,position:dataToSend})
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

  validate(){
    let messages:WarningMessageData[]=[]
    if(this.isCharALetter){
      let varRefValidation=this.validateVariableReference()
      if(varRefValidation)
        messages.push(varRefValidation)
    }
    if(this.isParentAFraction){
      let fracCharValidation=this.validateFractionChar()
      if(fracCharValidation)
        messages.push(fracCharValidation)
    }
    if(this.isParentAnExponent){
      let expCharValidation=this.validateExponentChar()
      if(expCharValidation)
        messages.push(expCharValidation)
    }

    let isValid=messages.length==0
    let validationData:ValidationData={
      isValid,
      messages,
      type:isValid?
        undefined:messages.find((message)=>message.type=='fully-invalid') ?
          'fully-invalid':'partially-invalid'
    }

    this.setValidationData(validationData)
  }

  private get isCharALetter():boolean{
    return /^[a-zA-z]$/.test(this.char)
  }
  private get isParentAFraction(){
    return this.parent instanceof FractionChildComponent
  }
  private get isParentAnExponent(){
    return this.parent instanceof ExponentComponent
  }

  private validateVariableReference():WarningMessageData|undefined{
    let isInvalid:boolean=!this.variableProvider.variableNames.includes(this.char);
    if (isInvalid)
      return{ message:`No se encontro a la variable: "${this.char}"`,type:'fully-invalid'}
    return;
  }
  private validateFractionChar():WarningMessageData|undefined{
    let parentValue=this.parent.value
    let isInvalid=/^0+$/.test(parentValue)
    if(isInvalid)
      return {message:'No se puede dividir por 0.', type:'partially-invalid'}
    return;
  }
  private validateExponentChar():WarningMessageData|undefined{
    let parentValue=this.parent.value
    if(/^0+$/.test(parentValue))
      return {message:'Cualquier valor elevado a 0 es igual a 1.', type:'partially-invalid'}
    if(parentValue=='1')
      return {message:'Elevar a la potencia 1 es redundante.', type:'partially-invalid'}
    return;
  }


  private setValidationData({isValid,type,messages}:ValidationData){
    this.valid=isValid
    this.warningMessages=messages||[]
    this.invalidType=type
  }

  ignoreValidation(){
    this.setValidationData({isValid:true,type:undefined,messages:undefined})
  }
  // ------------------VARIABLE CHECKING LOGIC------------------
}
