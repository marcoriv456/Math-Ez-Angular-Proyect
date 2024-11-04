import {QueryList} from "@angular/core";
import {InputTermDirective} from "../directives/input-term.directive";
import {InputCharData} from "../char/char.component";

export abstract class InputEditableElement{
  protected abstract parent?:InputEditableElement
  protected abstract renderedChars:QueryList<InputTermDirective>


  protected getCharData(index:number){
    return this.renderedChars.get(index)?.data
  }

  protected getNextSpecialCharFixedData(caretIndex:number):InputCharData{
    let nextSpecialChar=this.getNextSpecialCharData(caretIndex)

    if(nextSpecialChar && nextSpecialChar.index-1!==caretIndex)
      nextSpecialChar=this.renderedChars.get(nextSpecialChar.index-1)?.data

    return nextSpecialChar||this.lastCharData
  }

  protected getNextSpecialCharData(caretIndex:number){
    return this.findSpecialChar(
      caretIndex+1,
      this.renderedChars.length,
      i=>i+1,
      (from, to)=>from<to
    )
  }

  protected getPrevSpecialCharFixedData(caretIndex:number){
    let prevSpecialChar=this.getPrevSpecialCharData(caretIndex)

    if(prevSpecialChar&&prevSpecialChar.index==caretIndex)
      prevSpecialChar=this.renderedChars.get(prevSpecialChar.index-1)?.data

    return prevSpecialChar||this.noCharData
  }

  protected getPrevSpecialCharData(caretIndex:number){
    return this.findSpecialChar(
      caretIndex,
      0,
      i=>i-1,
      (from,to)=>from>=to);
  }

  protected findSpecialChar(from:number,to:number,stepF:(i:number)=>number,conditionF:(from:number,to:number)=>boolean):InputCharData|undefined{
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
  protected isCharIrregular(char:string){
    return /[^a-zA-Z\d]/.test(char)
  }

  protected get lastCharData(){
    return this.renderedChars.get(this.renderedChars.length-1)?.data||this.noCharData
  }
  protected get noCharData(){
    return {index:-1,position:0}
  }

}
