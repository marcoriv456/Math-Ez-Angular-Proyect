import {
  AfterViewInit,
  Directive,
  ElementRef, HostBinding,
  HostListener,
  inject, Input, OnDestroy, OnInit,
} from '@angular/core';
import {CharClickedNotifierService} from "../../services/char-clicked-notifier/char-clicked-notifier.service";
import {InputCharData} from "../../models/input-char-data.model";
import {InputEditableElement} from "../input-editable-element/input-editable-element.directive";
import {TermValidator} from "../../validation/abstracts/validator.abstract";
import {CharValidator} from "../../validation/validators/char.validator";
import {VariableProviderService} from "../../services/variable-provider/variable-provider.service";
import {CharComponent} from "../../components/char/char.component";
import {WarningsService} from "../../services/warnings/warnings.service";
import {TermValidationData} from "../../validation/models/term-validation-data.model";
import {validTermValidation} from "../../validation/default-values/valid-term-validation";

@Directive({
  selector: '[inputTerm]'
})
export class InputTermDirective implements OnInit,AfterViewInit,OnDestroy{
  @Input('inputTerm')
  input!:{char:string, index:number,editableElementRef?:InputEditableElement,charClassRef?:CharComponent,parent:InputEditableElement}
  ref=inject(ElementRef).nativeElement as HTMLElement
  charClickedNotifier=inject(CharClickedNotifierService)

  ngOnInit() {
    this.validationData=validTermValidation
  }

  ngAfterViewInit() {
    if(this.asEditableElement)
      this.asEditableElement.validationRequester.subscribe(()=>this.updateValidation())
    setTimeout(()=>{
      this.updateValidation()
    })
  }

  get data():InputCharData{
    return {
      positionX:this.rightPosition,
      index:this.index,
      parent:this.parent
    }
  }

  get rightPosition(){
    return this.leftPosition+this.ref.offsetWidth
  }

  get topPosition(){
    return this.ref.getBoundingClientRect().top
  }

  get index(){
    return this.input.index
  }

  get parent(){
    return this.input.parent
  }

  get char(){
    return this.input.char
  }

  get asEditableElement(){
    return this.input.editableElementRef
  }

  private get asCharComponent(){
    return this.input.charClassRef
  }

  get leftPosition(){
    let parent:HTMLElement|null=this.ref.parentElement
    let leftPosition=this.ref.offsetLeft
    while(parent && !(parent.tagName=='APP-INPUT')){
      leftPosition+=parent.offsetLeft||0
      parent=parent.parentElement
    }
    return leftPosition
  }

  protected get absoluteLeftPosition(){
    return this.ref.getBoundingClientRect().left
  }

  protected get absoluteCenteredLeftPosition(){
    return this.absoluteLeftPosition+(this.ref.offsetWidth/2)
  }

  @HostListener('click',['$event'])
  private onClick(event:MouseEvent){
    event.stopPropagation()
    const clickPosition=event.clientX-this.absoluteLeftPosition

    let dataToSend:InputCharData

    if(this.asEditableElement && this.asEditableElement.editable)
      dataToSend=this.asEditableElement.noCharData
    else
      dataToSend=this.getClickedCharData(clickPosition)

    this.charClickedNotifier.charClicked.emit(dataToSend)
  }

  private getClickedCharData(clickPosition:number){
    let charData=this.data

    if(this.wasClickOnLeftSide(clickPosition)){
      charData.positionX=this.leftPosition
      charData.index-=1
    }

    return charData
  }

  private wasClickOnLeftSide(clickPosition:number){
    return this.ref.offsetWidth/2>clickPosition
  }

  // --------------VALIDATION LOGIC------------------
  public validationData!:TermValidationData

  private isMouseOver=false
  private readonly warningsService=inject(WarningsService)

  private get validator():TermValidator|undefined{
    if(this.asEditableElement)
      return this.asEditableElement.validator
    else if(this.asCharComponent)
      return new CharValidator(this.asCharComponent)
    return;
  }

  @HostBinding('class')
  get validityClassBinding(){
    return this.validationData.type
  }

  @HostListener('mouseover')
  private onMouseOver(){
    if(this.validationData.isValid)
      return;
    this.emitShowWarning()
    this.isMouseOver=true
  }

  @HostListener('mouseleave')
  private onMouseLeave(){
    if(this.validationData.isValid)
      return;
    this.emitHideWarning()
    this.isMouseOver=false
  }

  ngOnDestroy() {
    if(this.isMouseOver)
      this.emitHideWarning()
  }

  public updateValidation(){
    if(!this.validator)
      return;
    this.setValidationData(this.validator.validate())
    if(this.isMouseOver)
      this.validationData.isValid ? this.emitHideWarning() : this.emitShowWarning()
  }

  private emitShowWarning(){
    this.warningsService.showWarning.emit({
      messages:this.validationData.messages||[],
      position:{x:this.absoluteCenteredLeftPosition,y:this.topPosition}})
  }

  private emitHideWarning(){
    this.warningsService.hideWarning.emit()
  }

  private setValidationData(data:TermValidationData){
    this.validationData=data
  }
  // --------------VALIDATION LOGIC------------------
}
