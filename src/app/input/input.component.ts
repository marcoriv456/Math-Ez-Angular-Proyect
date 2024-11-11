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
import {CaretPositioningService} from "./services/caret-positioning/caret-positioning.service";
import {FractionComponent} from "./fraction/fraction.component";
import {InputTermDirective} from "./directives/input-term.directive";
import {InputEditableElement} from "./classes/input-editable-element";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent extends InputEditableElement implements AfterViewInit{
  @HostBinding('tabindex')
  tabIndex=0
  @ViewChild('caret')
  caretRef!:ElementRef
  @ViewChildren(InputTermDirective)
  renderedChars!:QueryList<InputTermDirective>

  parent=undefined

  @HostListener('click')
  onClick(){
    this.moveCaretTo(this.currentElement.lastCharData)
  }

  cdr=inject(ChangeDetectorRef)
  renderer=inject(Renderer2)
  caretPositioningService=inject(CaretPositioningService)
  terms:Term[]=[
    { char: 'h', type: 'char' },
    { char: 'o', type: 'char' },
    { char: 'l', type: 'char' },
    { char: 'a', type: 'char' },
    { char: '+', type: 'char' },
    { char: 'm', type: 'char' },
    { char: 'u', type: 'char' },
    { char: 'n', type: 'char' },
    { char: 'd', type: 'char' },
    { char: 'o', type: 'char' },
    { char: '+', type: 'char' },
    { char: 'x', type: 'char' },
    { char: 'd', type: 'char' },
    { char: 'd', type: 'char' },
    { char: 'd', type: 'char' },
    {numeratorChildren:[{char:'1',type:'char'},{char:'0',type:'char'}],denominatorChildren:[{char:'4',type:'char'}],type:'fraction'}
  ];

  currentElement:InputEditableElement=this
  caretPosition=0
  caretIndex=0
  ref=inject(ElementRef).nativeElement as HTMLElement

  index=0
  ngAfterViewInit() {
    this.caretPositioningService.charClicked.subscribe((charData)=>this.moveCaretTo(charData))
    this.caretPositioningService.setInputRef(this)
  }

  override get positionX(): number {
    return this.ref.getBoundingClientRect().left
  }
  override get positionY():number{
    return this.ref.getBoundingClientRect().top
  }

  @HostListener('keydown',['$event'])
  onKeyDown(event:KeyboardEvent){
    let {key,ctrlKey}=event

    if(key!=='Tab')
      event.preventDefault()
    if(key.length==1)
      this.appendChar(key)
    else if(ctrlKey)
      this.onSpecialCtrlKeyDown(key)
    else
      this.onSpecialKeyDown(key)
    console.log("key: ", key)
  }

  private onSpecialKeyDown(key:string){
    switch (key){
      case 'Backspace':
        this.deleteChar()
        break;
      case 'ArrowRight':
        this.moveToNextElement()
        break;
      case 'ArrowLeft':
        this.moveCaretTo(this.prevCharData)
        break;
    }
  }


  private moveToNextElement(){
    let nextElement=this.currentElement.terms[this.caretIndex+1]
    let isNextElementChar=nextElement && nextElement.type=='char'
    let isCaretInTheLastPosition=!nextElement && this.currentElement==this

    if( isNextElementChar || isCaretInTheLastPosition)
      this.moveCaretTo(this.nextCharData)
    else
      this.moveCaretContext()
  }

  private moveCaretContext(){
    let nextRenderedElement= this.nextRenderedElement||this.nextRenderedElementInParent
    let nextRenderedElementClassRef=nextRenderedElement?.classRef
    if(!nextRenderedElement || !nextRenderedElementClassRef)
      this.moveContextToActualParent()
    else
      this.moveContextToNextRenderedElement(nextRenderedElement)
  }

  private moveContextToActualParent(){
    let actualIndex=this.currentElement.index
    let actualParent=this.currentElement.parent
    if(actualParent instanceof FractionComponent){
      actualIndex=actualParent.index
      actualParent=actualParent.parent
    }
    this.setCurrentElement(actualParent||this)
    this.moveCaretTo(this.currentElement.getCharData(actualIndex)||this.currentElement.lastCharData)
  }

  private moveContextToNextRenderedElement(nextRenderedElement:InputTermDirective){
    if(nextRenderedElement.classRef instanceof FractionComponent)
      nextRenderedElement=nextRenderedElement.classRef.numeratorComponent
    this.setCurrentElement(nextRenderedElement?.classRef||this)
    this.moveCaretTo(this.currentElement.noCharData)
  }

  private get nextRenderedElement(){
    return this.currentElement.renderedChars.get(this.caretIndex+1)
  }
  private get nextRenderedElementInParent(){
    return this.currentElement.parent?.renderedChars.get(this.currentElement.index+1)
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

  appendChar(char:string) {
    if(char=='/')
      this.appendFraction()
    else
      this.currentElement.terms.splice(this.caretIndex+1,0, {char,type:'char'})
    this.cdr.detectChanges()
    this.moveCaretTo(this.nextCharData)
  }

  moveCaretTo({positionX,positionY,index,size}:InputCharData){
    this.renderer.setStyle(this.caretRef.nativeElement,'left',positionX+'px')
    this.renderer.setStyle(this.caretRef.nativeElement,'top',positionY+'px')
    this.renderer.setStyle(this.caretRef.nativeElement,'--height',size+'px',2)
    this.caretIndex=index
  }
  deleteChar(from=this.caretIndex, deleteCount=1){
    if(this.caretIndex==-1)
      return
    this.currentElement.terms.splice(from,deleteCount)
    this.moveCaretTo(this.currentElement.getCharData(from-1)||this.currentElement.noCharData)
  }


// ------------------STRUCTURING LOGIC------------------
  private appendFraction(){
    let prevCharsFrom=(this.currentElement.getPrevSpecialCharData(this.caretIndex)?.index||-1)+1
    let prevCharsTo=this.caretIndex+1
    let prevChars=this.currentElement.terms.slice(prevCharsFrom,prevCharsTo)
    console.log("prev: ",prevCharsFrom,prevCharsTo)


    let nextCharsTo=(this.currentElement.getNextSpecialCharData(this.caretIndex)?.index||this.currentElement.lastCharData.index+1)
    let nextCharsFrom=this.caretIndex+1
    let nextChars=this.currentElement.terms.slice(nextCharsFrom,nextCharsTo)
    console.log("next: ",nextCharsFrom,nextCharsTo)

    this.currentElement.terms.splice(
      prevCharsFrom,
      nextCharsTo-prevCharsFrom,
      {numeratorChildren:prevChars,denominatorChildren:nextChars,type:'fraction'})

    // console.log('prev char index: ',this.prevCharData.index+1,this.caretIndex+1)
    console.log(prevChars.map(term=>term.type=='char'?term.char:''))
    console.log(nextChars.map(term=>term.type=='char'?term.char:''))
  }
  @HostBinding('style.--font-size')
  override get fontSizeToBind(){
    return super.fontSizeToBind
  }

// ------------------STRUCTURING LOGIC------------------
  protected readonly console = console;
}
export interface CharTerm extends PowerableTerm{
  char:string
  type:'char'
}

export interface FractionTerm extends PowerableTerm{
  numeratorChildren:Term[]
  denominatorChildren:Term[]
  type:'fraction'
}

export interface RootTerm extends PowerableTerm{
  rootChildren:Term[]
  type:'root'
}

export interface PowerableTerm{
  powChildren?:Term[]
}

export type Term=CharTerm|FractionTerm|RootTerm
