import {InputEditableElement} from "../input-editable-element.class";
import {ChangeDetectorRef} from "@angular/core";
import {Term} from "../../models/terms/term.model";
import {InputCharData} from "../../models/input-char-data.model";

export class ParenthesisAdder{
  constructor(
    private currentElement:InputEditableElement,
    private cdr:ChangeDetectorRef,
    private parenthesis:string
  ) {
    this.setup()
  }

  private data!:{
    from:number,
    to:number
    terms:Term[]
  }

  public appendParenthesis(){
    let {from,to,terms}=this.data
    this.currentElement.append(from,to-from,{type:'parenthesis',parenthesisChildren:terms})
    if(this.parenthesis=="(")
      return this.getAddedParenthesis()?.noCharData || this.currentElement.noCharData
    return this.currentElement.getCharData(from+1) ||this.currentElement. noCharData
  }

  public isThereAMatchingParenthesis(){
    return !!this.data;
  }

  private setup(){
    let data=this.scan()
    if(!data)
      return;
    this.setData(data)
  }

  private scan(){
    if(this.parenthesis=="(")
      return this.scanForwards()
    else
      return this.scanBackwards()
  }

  private setData(data:{from: number, to: number, terms: Term[]}){
    this.data=data
  }

  private scanForwards(){
    let nextParenthesis=this.findNextParenthesisChar()
    if(!nextParenthesis)
      return;
    let from=this.currentElement.nextIndex,
        to=nextParenthesis.index+1;
    return { from, to, terms:this.currentElement.terms.slice(from,to-1) }
  }

  private findNextParenthesisChar(){
    for(let i=this.currentElement.caretIndex; i<this.currentElement.terms.length; i++){
      let term=this.currentElement.getRenderedChar(i)
      if(term&&term.char==')')
        return term
    }
    return;
  }

  private scanBackwards(){
    let prevParenthesis=this.findPrevParenthesisChar()
    if(!prevParenthesis)
      return;
    let from=prevParenthesis.index,
        to=this.currentElement.nextIndex;
    return{ from, to, terms:this.currentElement.terms.slice(from+1,to) }
  }

  private findPrevParenthesisChar(){
    for(let i=this.currentElement.caretIndex; i>=0; i--){
      let term=this.currentElement.getRenderedChar(i)
      if(term&&term.char=='(')
        return term
    }
    return;
  }

  private getAddedParenthesis(){
    this.cdr.detectChanges()
    return this.currentElement.getRenderedChar(this.currentElement.caretIndex+1)?.asEditableElement
  }

}
