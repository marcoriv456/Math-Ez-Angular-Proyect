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
import {Term} from "./terms/term.model";
import {InputCharData} from "./input-char-data.model";
import {TermContainerComponent} from "../components/term-container/term-container.component";
import {WarningsService} from "../services/warnings/warnings.service";
import {WarningMessageData} from "./char-validation/warning-message-data.model";
import {TermValidationService} from "../services/term-validation/term-validation.service";
import {ValidationData} from "./char-validation/validation-data.model";


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

  private readonly irregularCharRegexp=/[^a-zA-Z\d]/

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
    return this.ref.getBoundingClientRect().top-this.inputUtilitiesService.inputPositionY;
  }

  getCharData(index:number){
    return this.renderedChars.get(index)?.data
  }

  getNextSpecialCharFixedData(caretIndex:number):InputCharData{
    let nextSpecialChar=this.getNextSpecialCharData(caretIndex)

    if(nextSpecialChar && nextSpecialChar.index-1!==caretIndex)
      nextSpecialChar=this.renderedChars.get(nextSpecialChar.index-1)?.data

    return nextSpecialChar||this.lastCharData
  }

  getNextSpecialCharData(caretIndex:number){
    return this.findSpecialChar(
      caretIndex+1,
      this.renderedChars.length,
      i=>i+1,
      (from, to)=>from<to
    )
  }

  getPrevSpecialCharFixedData(caretIndex:number){
    let prevSpecialChar=this.getPrevSpecialCharData(caretIndex)

    if(prevSpecialChar&&prevSpecialChar.index==caretIndex)
      prevSpecialChar=this.renderedChars.get(prevSpecialChar.index-1)?.data

    return prevSpecialChar||this.noCharData
  }

  getPrevSpecialCharData(caretIndex:number){
    return this.findSpecialChar(
      caretIndex,
      0,
      i=>i-1,
      (from,to)=>from>=to);
  }

  private findSpecialChar(from:number,to:number,stepF:(i:number)=>number,conditionF:(from:number,to:number)=>boolean):InputCharData|undefined{
    let renderedChars=this.renderedChars
    let i=from
    while (conditionF(i,to)){
      let char=renderedChars.get(i)
      if(char && this.isCharIrregular(char.char))
        return char.data
      i=stepF(i)
    }
    return undefined
  }

  private isCharIrregular(char:string){
    return this.irregularCharRegexp.test(char)
  }

  get lastCharData(){
    return this.renderedChars.get(this.renderedChars.length-1)?.data||this.noCharData
  }

  get noCharData():InputCharData{
    return {index:-1,positionX:this.positionX,positionY:this.positionY,size:this.size}
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

  removeChars(from:number, deleteCount=1):InputCharData|undefined {
    if(this.terms.length)
      return this.removeSimpleChar(from, deleteCount);
    this.inputUtilitiesService.elementDeletedEmitter.emit({elementIndex:this.index,residualData:[]})
    return;
  }
  // ------------------VARIABLE CHECKING LOGIC------------------
  get toString(){
    return this.terms.map(child=>{
      if(child.type=='char')
        return child.char
      return '~'
    }).join('')
  }
  // ------------------VARIABLE CHECKING LOGIC------------------
  // ---------------------CHAR UPDATES LOGIC---------------------
  updateTermsValidation(){
    // this.renderedChars.forEach(char=>char.validate())
  }
  // ----------------------VALIDATION LOGIC----------------------
  isMouseOver=false
  warningsService=inject(WarningsService)
  validationData:ValidationData={
    isValid:true,
    messages:[]
  }
  @HostBinding('class')
  get validityClassBinding(){
    return this.validationData.type
  }
  @HostListener('mouseover')
  onMouseOver(){
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
  validate():ValidationData{
    let messages=this.getValidationMessages()
    let isValid=messages.length==0
    let type=isValid?undefined:(messages.find(value => value.type=='fully-invalid')?.type||'partially-invalid')
    let dataToSend= {isValid, messages, type}
    console.log(dataToSend)
    return dataToSend
  }

  protected getValidationMessages():WarningMessageData[]{
    return []
  }

  private emitShowWarning(){
    this.warningsService.showWarning.emit({
      messages:this.validationData.messages||[],
      position:{x:this.positionX,y:this.positionY}})
  }

  private emitHideWarning(){
    this.warningsService.hideWarning.emit()
  }

  private setValidationData(data:ValidationData){
    this.validationData=data
  }


  // ----------------------VALIDATION LOGIC----------------------
}
