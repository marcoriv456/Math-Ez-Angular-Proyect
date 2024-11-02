import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject, QueryList,
  Renderer2, ViewChild, ViewChildren,
} from '@angular/core';
import {CharComponent, InputCharData} from "./char/char.component";
import {CaretPositioningService} from "./services/caret-positioning/caret-positioning.service";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements AfterViewInit{
  @HostBinding('tabindex')
  tabIndex=0
  @ViewChild('caret')
  caretRef!:ElementRef
  @ViewChildren(CharComponent)
  renderedChars!:QueryList<CharComponent>

  @HostListener('click')
  onClick(){
    this.moveCaretTo(this.lastCharData)
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
    {numeratorChildren:[{char:'10',type:'char'}],denominatorChildren:[{char:'4',type:'char'}],type:'fraction'}
  ];

  caretPosition=0
  caretIndex=0

  ngAfterViewInit() {
    this.caretPositioningService.charClicked.subscribe((charData)=>this.moveCaretTo(charData))
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
        this.moveCaretTo(this.nextCharData)
        break;
      case 'ArrowLeft':
        this.moveCaretTo(this.prevCharData)
        break;
    }
  }

  private get nextCharData(){
    return this.getCharData(this.caretIndex+1)||this.lastCharData
  }
  private get prevCharData(){
    return this.getCharData(this.caretIndex-1)||this.noCharData
  }

  private getCharData(index:number){
    return this.renderedChars.get(index)?.data
  }

  private onSpecialCtrlKeyDown(key:string){
    switch (key){
      case 'Backspace':
        this.deleteChar(this.prevSpecialCharFixedData.index+1,this.caretIndex-this.prevSpecialCharFixedData.index)
        break;
      case 'ArrowRight':
        this.moveCaretTo(this.nextSpecialCharFixedData)
        break;
      case 'ArrowLeft':
        this.moveCaretTo(this.prevSpecialCharFixedData)
        break;
    }
  }

  private get nextSpecialCharFixedData():InputCharData{
    let nextSpecialChar=this.nextSpecialCharData

    if(nextSpecialChar && nextSpecialChar.index-1!==this.caretIndex)
      nextSpecialChar=this.renderedChars.get(nextSpecialChar.index-1)?.data

    return nextSpecialChar||this.lastCharData
  }
  private get nextSpecialCharData(){
    return this.findSpecialChar(
      this.caretIndex+1,
      this.renderedChars.length,
      i=>i+1,
      (from, to)=>from<to
    )
  }

  private get prevSpecialCharFixedData(){
    let prevSpecialChar=this.prevSpecialCharData

    if(prevSpecialChar&&prevSpecialChar.index==this.caretIndex)
      prevSpecialChar=this.renderedChars.get(prevSpecialChar.index-1)?.data

    return prevSpecialChar||this.noCharData
  }

  private get prevSpecialCharData(){
    return this.findSpecialChar(
      this.caretIndex,
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
    return /[^a-zA-Z\d]/.test(char)
  }

  private get lastCharData(){
    return this.renderedChars.get(this.renderedChars.length-1)?.data||this.noCharData
  }
  private get noCharData(){
    return {index:-1,position:0}
  }

  appendChar(char:string) {
    if(char=='/')
      this.appendFraction()
    else
      this.terms.splice(this.caretIndex+1,0, {char,type:'char'})
    this.cdr.detectChanges()
    this.moveCaretTo(this.nextCharData)
  }

  moveCaretTo({position,index}:InputCharData){
    this.renderer.setStyle(this.caretRef.nativeElement,'left',position+'px')
    this.caretIndex=index
  }
  deleteChar(from=this.caretIndex, deleteCount=1){
    if(this.caretIndex==-1)
      return
    this.terms.splice(from,deleteCount)
    this.moveCaretTo(this.getCharData(from-1)||this.noCharData)
  }


// ------------------STRUCTURING LOGIC------------------
  private appendFraction(){
    let prevCharsFrom=(this.prevSpecialCharData?.index||-1)+1
    let prevCharsTo=this.caretIndex+1
    let prevChars=this.terms.slice(prevCharsFrom,prevCharsTo)
    console.log("prev: ",prevCharsFrom,prevCharsTo)


    let nextCharsTo=(this.nextSpecialCharData?.index||this.lastCharData.index+1)
    let nextCharsFrom=this.caretIndex+1
    let nextChars=this.terms.slice(nextCharsFrom,nextCharsTo)
    console.log("next: ",nextCharsFrom,nextCharsTo)

    this.terms.splice(
      prevCharsFrom,
      nextCharsTo-prevCharsFrom,
      {numeratorChildren:prevChars,denominatorChildren:nextChars,type:'fraction'})

    // console.log('prev char index: ',this.prevCharData.index+1,this.caretIndex+1)
    console.log(prevChars.map(term=>term.type=='char'?term.char:''))
    console.log(nextChars.map(term=>term.type=='char'?term.char:''))
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
