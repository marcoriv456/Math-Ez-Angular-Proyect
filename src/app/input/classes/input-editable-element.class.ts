import {
  Component,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnDestroy,
  ViewChild
} from "@angular/core";
import {InputUtilitiesService} from "../services/caret-positioning/input-utilities.service";
import {Term} from "../models/terms/term.model";
import {InputCharData} from "../models/input-char-data.model";
import {TermContainerComponent} from "../components/term-container/term-container.component";
import {WarningsService} from "../services/warnings/warnings.service";
import {TermWarningMessageData} from "../models/char-validation/warning-message-data.model";
import {TermValidationData} from "../models/char-validation/validation-data.model";


@Directive()
export abstract class InputEditableElement implements OnDestroy{
  abstract termContainer: TermContainerComponent
  @Input()
  terms!:Term[]
  @Input()
  parent!:InputEditableElement|undefined
  @Input()
  index!:number
  ref=inject(ElementRef).nativeElement as HTMLElement
  inputUtilitiesService=inject(InputUtilitiesService)
  editable=true
  caretIndex=-1

  private readonly irregularCharRegexp=/[^a-zA-Z\d]/

  get renderedChars(){
    return this.termContainer.renderedChars
  }

  protected get absolutePositionX(){
    return this.ref.getBoundingClientRect().left-this.inputUtilitiesService.inputPositionX
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
    return this.ref.getBoundingClientRect().top-this.inputUtilitiesService.inputPositionY;
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

  protected removeSimpleChar(from:number, deleteCount=1):InputCharData|undefined{
    if(from==-1)
      return
    this.terms.splice(from,deleteCount)
    return this.getCharData(from-1)||this.noCharData
  }

  remove(from:number, deleteCount=1):InputCharData|undefined {
    if(this.terms.length)
      return this.removeSimpleChar(from, deleteCount);
    this.inputUtilitiesService.elementDeletedEmitter.emit({elementIndex:this.index,residualData:[]})
    return;
  }
  // ----------------------VALIDATION LOGIC----------------------
  get toString(){
    return this.terms.map(child=>{
      if(child.type=='char')
        return child.char
      return '~'
    }).join('')
  }
  isMouseOver=false
  warningsService=inject(WarningsService)
  validationData:TermValidationData={
    isValid:true,
    messages:[]
  }
  @HostBinding('class')
  get validityClassBinding(){
    return this.validationData.type
  }
  @HostListener('mouseover')
  onMouseOver(  ){
    if(this.validationData.isValid)
      return;
    this.emitShowWarning()
    this.isMouseOver=true
  }
  @HostListener('mouseleave')
  onMouseLeave(){
    if(this.validationData.isValid)
      return;
    this.emitHideWarning()
    this.isMouseOver=false
  }
  ngOnDestroy() {
    if(this.isMouseOver)
      this.emitHideWarning()
  }

  updateValidation(){
    this.setValidationData(this.validate())
    if(this.isMouseOver)
      this.validationData.isValid ? this.emitHideWarning() : this.emitShowWarning()
  }
  validate():TermValidationData{
    let messages=this.getValidationMessages()
    let isValid=messages.length==0
    let type=isValid?undefined:(messages.find(value => value.type=='fully-invalid')?.type||'partially-invalid')
    return {messages,isValid,type}
  }

  protected getValidationMessages():TermWarningMessageData[]{
    return []
  }

  private emitShowWarning(){
    this.warningsService.showWarning.emit({
      messages:this.validationData.messages||[],
      position:{x:this.absoluteCenteredPositionX,y:this.positionY}})
  }

  private emitHideWarning(){
    this.warningsService.hideWarning.emit()
  }

  private setValidationData(data:TermValidationData){
    this.validationData=data
  }

  append(from:number, deleteCount:number,...term:Term[]){
    this.terms.splice(from,deleteCount,...term)
    this.updateValidation()
  }

  // ----------------------VALIDATION LOGIC----------------------
}
