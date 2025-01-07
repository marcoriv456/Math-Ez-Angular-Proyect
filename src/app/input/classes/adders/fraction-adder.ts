import {Term} from "../../models/terms/term.model";
import {FractionComponent} from "../../components/fraction/fraction.component";
import {InputEditableElement} from "../input-editable-element.class";
import {ChangeDetectorRef} from "@angular/core";
import {InputCharData} from "../../models/input-char-data.model";
import {FractionChildComponent} from "../../components/fraction/fraction-child/fraction-child.component";

export class FractionAdder{
  constructor(
    private currentElement:InputEditableElement,
    private cdr:ChangeDetectorRef
  ) {
    this.setupFractionData()
  }

  private origin!:number
  private from!:number
  private to!:number
  private prevChars!:Term[]
  private nextChars!:Term[]

  private setupFractionData(){
    this.origin=this.currentElement.nextIndex
    this.from=(this.currentElement.getPrevSpecialCharData()?.index||-1)+1
    this.to=(this.currentElement.getNextSpecialCharData()?.index||this.currentElement.lastCharData.index+1)
    this.prevChars=this.currentElement.terms.slice(this.from,this.origin)
    this.nextChars=this.currentElement.terms.slice(this.origin,this.to)
  }

  public appendFraction():InputCharData{
    this.appendFractionToCurrentElement()
    this.cdr.detectChanges()
    let isFractionFilled=this.prevChars.length && this.nextChars.length
    if(!isFractionFilled)
      return this.moveCaretToEmptyFractionChild()
    return this.currentElement.getCharData(this.from-1)||this.currentElement.noCharData
  }

  private appendFractionToCurrentElement(){
    this.currentElement.append(this.from, this.to-this.from, {
      numeratorChildren:this.prevChars,
      denominatorChildren:this.nextChars,
      type:'fraction'
    })
  }

  private moveCaretToEmptyFractionChild(){
    let appendedFrac=this.currentElement.getRenderedChar(this.from)?.asEditableElement as FractionComponent
    if(!this.nextChars.length)
      return (appendedFrac.denominatorComponent.asEditableElement as FractionChildComponent).noCharData
    return (appendedFrac.numeratorComponent.asEditableElement as FractionChildComponent).noCharData
  }

}
