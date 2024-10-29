import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject, QueryList,
  Renderer2, ViewChild, ViewChildren,
} from '@angular/core';
import {CharComponent, InputCharData} from "./char/char.component";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @HostBinding('tabindex')
  tabIndex=0
  @ViewChild('caret')
  caretRef!:ElementRef
  @ViewChildren(CharComponent)
  renderedChars!:QueryList<CharComponent>

  cdr=inject(ChangeDetectorRef)
  renderer=inject(Renderer2)
  chars:string[]=[ 'h', 'o', 'l', 'a', '+', 'm', 'u', 'n', 'd', 'o', '+', 'x', 'd', 'd', 'd' ]
  caretPosition=0
  caretIndex=0

  @HostListener('keydown',['$event'])
  onKeyDown(event:KeyboardEvent){
    event.preventDefault()
    let {key,ctrlKey}=event
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
        this.deleteChar(this.prevSpecialCharData.index+1,this.caretIndex-this.prevSpecialCharData.index)
        break;
      case 'ArrowRight':
        this.moveCaretTo(this.nextSpecialCharData)
        break;
      case 'ArrowLeft':
        this.moveCaretTo(this.prevSpecialCharData)
        break;
    }
  }

  private get nextSpecialCharData():InputCharData{
    let nextSpecialChar=this.findSpecialChar(
      this.caretIndex+1,
      this.renderedChars.length,
      i=>i+1,
      (from, to)=>from<to
    )

    if(nextSpecialChar && nextSpecialChar.index-1!==this.caretIndex)
      nextSpecialChar=this.renderedChars.get(nextSpecialChar.index-1)?.data

    return nextSpecialChar||this.lastCharData
  }


  private get prevSpecialCharData(){
    let prevSpecialChar=this.findSpecialChar(
      this.caretIndex,
      0,
      i=>i-1,
      (from,to)=>from>=to)

    if(prevSpecialChar&&prevSpecialChar.index==this.caretIndex)
      prevSpecialChar=this.renderedChars.get(prevSpecialChar.index-1)?.data

    return prevSpecialChar||this.noCharData
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
    this.chars.splice(this.caretIndex+1,0,char)
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
    this.chars.splice(from,deleteCount)
    this.moveCaretTo(this.getCharData(from-1)||this.noCharData)
  }
}
