import {Directive, ElementRef, HostBinding, HostListener, inject, Input, OnDestroy} from '@angular/core';
import {TermContainerComponent} from "../../components/term-container/term-container.component";
import {Term} from "../../models/terms/term.model";
import {CharClickedNotifierService} from "../../services/char-clicked-notifier/char-clicked-notifier.service";
import {InputCharData} from "../../models/input-char-data.model";
import {WarningsService} from "../../services/warnings/warnings.service";
import {TermValidationData} from "../../models/char-validation/validation-data.model";
import {TermWarningMessageData} from "../../models/char-validation/warning-message-data.model";
import {TermValidator} from "../../validation/abstracts/validator.abstract";
import {Subject} from "rxjs";

@Directive()
export abstract class InputEditableElement{
  abstract termContainer: TermContainerComponent
  @Input()
  terms!:Term[]
  @Input()
  parent!:InputEditableElement|undefined
  @Input()
  index!:number
  ref=inject(ElementRef).nativeElement as HTMLElement
  inputUtilitiesService=inject(CharClickedNotifierService)
  editable=true
  caretIndex=-1

  protected validatorClass!:{ new (component: any): TermValidator }|undefined
  get validator():TermValidator|undefined{
    if(this.validatorClass)
      return new this.validatorClass(this)
    return;
  }
  validationRequester=new Subject<void>()

  private readonly irregularCharRegexp=/[^a-zA-Z\d]/

  get renderedChars(){
    return this.termContainer.renderedChars
  }

  protected get absolutePositionX(){
    return this.ref.getBoundingClientRect().left
  }

  protected get absoluteCenteredPositionX(){
    return this.absolutePositionX+(this.ref.offsetWidth/2)
  }

  protected get positionX(): number {
    let parent:HTMLElement|null=this.ref.parentElement
    let leftPosition=this.ref.offsetLeft
    while(parent && !(parent.tagName=='APP-INPUT')){
      leftPosition+=parent.offsetLeft||0
      parent=parent.parentElement
    }
    return leftPosition
  }

  get positionY(): number {
    return this.ref.getBoundingClientRect().top;
  }
  getRenderedChar(index:number){
    return this.renderedChars.get(index)
  }

  getCharData(index:number){
    return this.getRenderedChar(index)?.data
  }

  get nextCharData(){
    return this.getCharData(this.caretIndex+1)||this.lastCharData
  }
  get prevCharData(){
    return this.getCharData(this.caretIndex-1)||this.noCharData
  }


  getNextSpecialCharFixedData():InputCharData{
    let nextSpecialChar=this.getNextSpecialCharData()

    if(nextSpecialChar && nextSpecialChar.index-1!==this.caretIndex)
      nextSpecialChar=this.renderedChars.get(nextSpecialChar.index-1)?.data

    return nextSpecialChar||this.lastCharData
  }

  getNextSpecialCharData(){
    for(let i=this.caretIndex+1; i<this.renderedChars.length;i++){
      let char=this.getRenderedChar(i)
      if(char && this.isCharIrregular(char.char))
        return char.data
    }
    return;
  }

  getPrevSpecialCharFixedData(){
    let prevSpecialChar=this.getPrevSpecialCharData()

    if(prevSpecialChar&&prevSpecialChar.index==this.caretIndex)
      prevSpecialChar=this.renderedChars.get(prevSpecialChar.index-1)?.data

    return prevSpecialChar||this.noCharData
  }

  getPrevSpecialCharData(){
    for(let i=this.caretIndex; i>=0;i--){
      let char=this.getRenderedChar(i)
      if(char && this.isCharIrregular(char.char))
        return char.data
    }
    return;
  }

  private isCharIrregular(char:string){
    return this.irregularCharRegexp.test(char)
  }

  get lastCharData(){
    return this.renderedChars.get(this.renderedChars.length-1)?.data||this.noCharData
  }

  get noCharData():InputCharData{
    return {index:-1,positionX:this.positionX,positionY:this.positionY,size:this.size, parent:this}
  }

  get nextIndex(){
    return this.caretIndex+1
  }

  get prevIndex(){
    return this.caretIndex-1
  }

  get size():number{
    return this.ref.offsetHeight
  }

  append(terms:Term[], index:number){
    this.terms.splice(index,0,...terms)
    this.updateValidation()
  }

  replace(from:number, deleteCount=1,terms:Term[]){
    this.terms.splice(from,deleteCount,...terms)
    this.updateValidation()
  }

  delete(from:number,deleteCount=1){
    this.terms.splice(from,deleteCount)
    this.updateValidation()
  }

  // ----------------------VALIDATION LOGIC----------------------
  get toString(){
    return this.terms.map(child=>{
      if(child.type=='char')
        return child.char
      return '~'
    }).join('')
  }
  updateValidation(){
    this.validationRequester.next()
  }

  // ----------------------VALIDATION LOGIC----------------------
  // ----------------------SELECTION LOGIC----------------------
  @HostBinding('class.selected')
  selected=false
  // ----------------------SELECTION LOGIC----------------------
  @HostListener('click',['$event'])
  private onClick(event:MouseEvent){
    event.stopPropagation()
    if(this.editable)
      this.inputUtilitiesService.charClicked.emit(this.lastCharData)
  }

}
