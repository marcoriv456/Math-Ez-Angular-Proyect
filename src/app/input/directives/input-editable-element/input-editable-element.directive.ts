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
  protected abstract termContainer: TermContainerComponent
  @Input()
  public terms!:Term[]
  @Input()
  public parent!:InputEditableElement|undefined
  @Input()
  public index!:number
  public ref=inject(ElementRef).nativeElement as HTMLElement
  public inputUtilitiesService=inject(CharClickedNotifierService)
  public editable=true
  public caretIndex=-1

  @HostBinding('class.selected')
  public selected=false

  public validationRequester=new Subject<void>()
  protected validatorClass!:{ new (component: any): TermValidator }|undefined

  private readonly irregularCharRegexp=/[^a-zA-Z\d]/

  @HostListener('click',['$event'])
  private onClick(event:MouseEvent){
    event.stopPropagation()
    if(this.editable)
      this.inputUtilitiesService.charClicked.emit(this.lastCharData)
  }

  get validator(){
    if(this.validatorClass)
      return new this.validatorClass(this)
    return;
  }

  get renderedChars(){
    return this.termContainer.renderedChars
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

  // ----------------------SELECTION LOGIC----------------------


}
