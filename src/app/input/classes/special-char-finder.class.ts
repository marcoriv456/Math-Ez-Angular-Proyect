import {InputEditableElement} from "../directives/input-editable-element/input-editable-element.directive";
import {QueryList} from "@angular/core";
import {InputTermDirective} from "../directives/input-term/input-term.directive";
import {InputCharData} from "../models/input-char-data.model";

export class SpecialCharFinder{
  private readonly renderedChars:QueryList<InputTermDirective>
  private readonly caretIndex:number
  private readonly lastCharData:InputCharData
  private readonly noCharData:InputCharData

  private readonly irregularCharRegexp=/[^a-zA-Z\d]/

  constructor(currentElement:InputEditableElement) {
    this.renderedChars=currentElement.renderedChars
    this.caretIndex=currentElement.caretIndex
    this.lastCharData=currentElement.lastCharData
    this.noCharData=currentElement.noCharData
  }

  public getNextSpecialCharFixedData():InputCharData{
    let nextSpecialChar=this.getNextSpecialCharData()

    if(nextSpecialChar && nextSpecialChar.index-1!==this.caretIndex)
      nextSpecialChar=this.renderedChars.get(nextSpecialChar.index-1)?.data

    return nextSpecialChar||this.lastCharData
  }

  public getNextSpecialCharData(){
    for(let i=this.caretIndex+1; i<this.renderedChars.length;i++){
      let char=this.getRenderedChar(i)
      if(char && this.isCharIrregular(char.char))
        return char.data
    }
    return;
  }

  public getPrevSpecialCharFixedData(){
    let prevSpecialChar=this.getPrevSpecialCharData()

    if(prevSpecialChar&&prevSpecialChar.index==this.caretIndex)
      prevSpecialChar=this.renderedChars.get(prevSpecialChar.index-1)?.data

    return prevSpecialChar||this.noCharData
  }

  public getPrevSpecialCharData(){
    for(let i=this.caretIndex; i>=0;i--){
      let char=this.getRenderedChar(i)
      if(char && this.isCharIrregular(char.char))
        return char.data
    }
    return;
  }

  private getRenderedChar(index:number){
    return this.renderedChars.get(index)
  }

  private isCharIrregular(char:string){
    return this.irregularCharRegexp.test(char)
  }

}
