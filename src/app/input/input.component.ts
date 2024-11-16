import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject, Input, QueryList,
  Renderer2, ViewChild, ViewChildren,
} from '@angular/core';
import {CharComponent, InputCharData} from "./char/char.component";
import {InputUtilitiesService} from "./services/caret-positioning/input-utilities.service";
import {FractionComponent} from "./fraction/fraction.component";
import {InputTermDirective} from "./directives/input-term.directive";
import {InputEditableElement} from "./models/input-editable-element.class";
import {CharTerm} from "./models/char-term.model";
import {FractionTerm} from "./models/fraction-term.model";
import {RootTerm} from "./models/root-term.model";
import {Term} from "./models/term.model";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent extends InputEditableElement implements AfterViewInit {
  @HostBinding('tabindex')
  tabIndex = 0
  @ViewChild('caret')
  caretRef!: ElementRef
  @ViewChildren(InputTermDirective)
  renderedChars!: QueryList<InputTermDirective>

  parent = undefined

  @HostListener('click')
  onClick() {
    this.moveCaretTo(this.currentElement.lastCharData)
  }

  cdr = inject(ChangeDetectorRef)
  renderer = inject(Renderer2)
  caretPositioningService = inject(InputUtilitiesService)
  terms: Term[] = [
    {char: 'h', type: 'char'},
    {char: 'o', type: 'char'},
    {char: 'l', type: 'char'},
    {char: 'a', type: 'char'},
    {char: '+', type: 'char'},
    {char: 'm', type: 'char'},
    {char: 'u', type: 'char'},
    {char: 'n', type: 'char'},
    {char: 'd', type: 'char'},
    {char: 'o', type: 'char'},
    {char: '+', type: 'char'},
    {char: 'x', type: 'char'},
    {char: 'd', type: 'char'},
    {char: 'd', type: 'char'},
    {char: 'd', type: 'char'},
    {
      numeratorChildren: [{char: '1', type: 'char'}, {char: '0', type: 'char'}],
      denominatorChildren: [{char: '4', type: 'char'}],
      type: 'fraction'
    }
  ];

  currentElement: InputEditableElement = this
  caretPosition = 0
  caretIndex = 0
  ref = inject(ElementRef).nativeElement as HTMLElement

  index = 0

  ngAfterViewInit() {
    this.caretPositioningService.charClicked.subscribe((charData) => this.moveCaretTo(charData))
    this.caretPositioningService.fractionDeleted.subscribe(({fractionIndex,residualData})=>this.deleteFraction(fractionIndex,residualData))
    this.caretPositioningService.setInputRef(this)
  }

  override get positionX(): number {
    return this.ref.getBoundingClientRect().left
  }

  override get positionY(): number {
    return this.ref.getBoundingClientRect().top
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    let {key, ctrlKey, altKey} = event

    if (key !== 'Tab')
      event.preventDefault()
    if (key.length == 1)
      this.appendChar(key,ctrlKey,altKey)
    else if (ctrlKey)
      this.onSpecialCtrlKeyDown(key)
    else
      this.onSpecialKeyDown(key)
    console.log("key: ", key)
  }

  private onSpecialKeyDown(key: string) {
    switch (key) {
      case 'Backspace':
        this.deleteChar()
        break;
      case 'ArrowRight':
        this.moveToNextElement()
        break;
      case 'ArrowLeft':
        this.moveToPreviousElement()
        break;
    }
  }

  private moveToNextElement() {
    let nextElement = this.currentElement.terms[this.caretIndex + 1]
    let isNextElementChar = nextElement && nextElement.type == 'char'
    let isCaretInTheLastPosition = !nextElement && this.currentElement == this

    if (isNextElementChar || isCaretInTheLastPosition)
      this.moveCaretTo(this.nextCharData)
    else
      this.moveCaretContextForward()
  }

  private moveCaretContextForward() {
    let nextRenderedElement = this.nextRenderedElement || this.nextRenderedElementInParent
    let nextRenderedElementClassRef = nextRenderedElement?.asEditableElement
    if (!nextRenderedElement || !nextRenderedElementClassRef)
      this.moveContextToActualParent((prevContextIndex)=>
        this.moveCaretTo(this.currentElement.getCharData(prevContextIndex)||this.currentElement.lastCharData)
      )
    else
      this.moveContextToNextRenderedElement(nextRenderedElement)
  }

  private get nextRenderedElement() {
    return this.getRenderedElementAt(this.caretIndex + 1)
  }

  private get nextRenderedElementInParent() {
    return this.getRenderedElementInParentAt(this.currentElement.index + 1)
  }

  private moveContextToNextRenderedElement(nextRenderedElement: InputTermDirective) {
    if (nextRenderedElement.asEditableElement instanceof FractionComponent)
      nextRenderedElement = nextRenderedElement.asEditableElement.numeratorComponent
    this.setCurrentElement(nextRenderedElement?.asEditableElement || this)
    this.moveCaretTo(this.currentElement.noCharData)
  }

  private moveToPreviousElement() {
    let prevElement = this.currentElement.terms[this.caretIndex]
    let isPrevElementChar = prevElement && prevElement.type == 'char'
    let isCaretInFirstChar = !prevElement && this.caretIndex == 0
    let isCaretInTheFirstPosition = !prevElement && this.currentElement == this

    if (isPrevElementChar || isCaretInTheFirstPosition || isCaretInFirstChar)
      this.moveCaretTo(this.prevCharData)
    else
      this.moveCaretContextBackwards()
  }

  private moveCaretContextBackwards() {
    let prevRenderedElement = this.prevRenderedElement || this.prevRenderedElementInParent
    if (!prevRenderedElement || !prevRenderedElement.asEditableElement)
      this.moveContextToActualParent(
        (prevContextIndex)=>
          this.moveCaretTo(this.currentElement.getCharData(prevContextIndex-1) || this.currentElement.noCharData))
    else
      this.moveContextToPrevRenderedElement(prevRenderedElement)
  }

  private moveContextToPrevRenderedElement(prevRenderedElement:InputTermDirective){
    if (prevRenderedElement.asEditableElement instanceof FractionComponent)
      prevRenderedElement = prevRenderedElement.asEditableElement.denominatorComponent
    this.setCurrentElement(prevRenderedElement?.asEditableElement || this)
    this.moveCaretTo(this.currentElement.lastCharData)
  }

  private get prevRenderedElement(){
    return this.getRenderedElementAt(this.caretIndex)
  }

  private get prevRenderedElementInParent(){
    return this.getRenderedElementInParentAt(this.currentElement.index-1)
  }

  private moveContextToActualParent(onContextChangeFinished:(prevContextIndex:number)=>void){
    let actualIndex=this.currentElement.index
    let actualParent=this.currentElement.parent
    if(actualParent instanceof FractionComponent){
      actualIndex=actualParent.index
      actualParent=actualParent.parent
    }
    this.setCurrentElement(actualParent||this)
    onContextChangeFinished(actualIndex)
  }




  private getRenderedElementAt(index:number){
    return this.currentElement.renderedChars.get(index)
  }
  private getRenderedElementInParentAt(index:number){
    return this.currentElement.parent?.renderedChars.get(index)
  }


  private setCurrentElement(element:InputEditableElement){
    this.renderer.removeClass(this.currentElement.ref,'selected')
    this.currentElement=element
    this.renderer.addClass(this.currentElement.ref,'selected')
  }

  private get nextCharData(){
    return this.currentElement.getCharData(this.caretIndex+1)||this.currentElement.lastCharData
  }
  private get prevCharData(){
    return this.currentElement.getCharData(this.caretIndex-1)||this.currentElement.noCharData
  }


  private onSpecialCtrlKeyDown(key:string){
    switch (key){
      case 'Backspace':
        this.deleteChar(this.currentElement.getPrevSpecialCharFixedData(this.caretIndex).index+1,this.caretIndex-this.currentElement.getPrevSpecialCharFixedData(this.caretIndex).index)
        break;
      case 'ArrowRight':
        this.moveCaretTo(this.currentElement.getNextSpecialCharFixedData(this.caretIndex))
        break;
      case 'ArrowLeft':
        this.moveCaretTo(this.currentElement.getPrevSpecialCharFixedData(this.caretIndex))
        break;
    }
  }

  override get noCharData(): InputCharData {
    let charData=super.noCharData
    charData.positionX=0
    charData.positionY=0
    return charData;
  }

  appendChar(char:string,ctrlKey?:boolean,altKey?:boolean) {
    if(char=='/')
      this.appendFraction()
    else if(char=='{' && ctrlKey && altKey)
      this.appendExponent()
    else
      this.currentElement.terms.splice(this.caretIndex+1,0, {char,type:'char'})
    this.cdr.detectChanges()
    this.moveCaretTo(this.nextCharData)
  }

  moveCaretTo({positionX,positionY,index,size,parent}:InputCharData){
    this.renderer.setStyle(this.caretRef.nativeElement,'left',positionX+'px')
    this.renderer.setStyle(this.caretRef.nativeElement,'top',positionY+'px')
    this.renderer.setStyle(this.caretRef.nativeElement,'--height',size+'px',2)
    if(parent)
      this.setCurrentElement(parent)
    this.caretIndex=index
  }
  deleteChar(from=this.caretIndex, deleteCount=1){
    if(this.caretIndex==-1&&this.currentElement==this)
      return
    let prevCharData=this.currentElement.removeChar(from,deleteCount)
    if(prevCharData)
      this.moveCaretTo(prevCharData)
  }


// ------------------STRUCTURING LOGIC------------------
  private appendFraction(){
    let prevCharsFrom=(this.currentElement.getPrevSpecialCharData(this.caretIndex)?.index||-1)+1
    let prevCharsTo=this.caretIndex+1
    let prevChars=this.currentElement.terms.slice(prevCharsFrom,prevCharsTo)
    let nextCharsTo=(this.currentElement.getNextSpecialCharData(this.caretIndex)?.index||this.currentElement.lastCharData.index+1)
    let nextCharsFrom=this.caretIndex+1
    let nextChars=this.currentElement.terms.slice(nextCharsFrom,nextCharsTo)
    this.currentElement.terms.splice(prevCharsFrom, nextCharsTo-prevCharsFrom, {
      numeratorChildren:prevChars,
      denominatorChildren:nextChars,
      type:'fraction'
    })
    if(nextChars.length && prevChars.length)
      return;
    this.cdr.detectChanges()
    let appendedFrac=this.currentElement.renderedChars.get(prevCharsFrom)?.asEditableElement as FractionComponent
    if(!nextChars.length){
      this.setCurrentElement(appendedFrac.denominatorComponent?.asEditableElement||this)
      this.moveCaretTo(this.currentElement.noCharData)
    }
    if(!prevChars.length){
      this.setCurrentElement(appendedFrac.numeratorComponent?.asEditableElement||this)
      this.moveCaretTo(this.currentElement.noCharData)
    }
  }
  private deleteFraction(fractionIndex:number,residualData:Term[]){
    this.moveContextToActualParent(()=>{});
    this.currentElement.terms.splice(fractionIndex,1,...residualData)
    this.cdr.detectChanges()
    this.moveCaretTo(this.currentElement.getCharData(fractionIndex+residualData.length-1) as InputCharData)
  }

  private appendExponent(){
    this.currentElement.terms.splice(this.caretIndex+1,0,{type:'exponent', exponentChildren:[]})
    this.cdr.detectChanges()
    let appendedExponent=this.currentElement.renderedChars.get(this.caretIndex+1)?.asEditableElement
    if(appendedExponent)
      this.setCurrentElement(appendedExponent)

    console.log('appended exponent: ',appendedExponent)

    // this.setCurrentElement()
  }


  @HostBinding('style.--font-size')
  override get fontSizeToBind(){
    return super.fontSizeToBind
  }

// ------------------STRUCTURING LOGIC------------------
  protected readonly console = console;
}

