import {Term} from "../../models/terms/term.model";
import {FractionComponent} from "../../components/fraction/fraction.component";
import {ChangeDetectorRef} from "@angular/core";
import {InputCharData} from "../../models/input-char-data.model";
import {FractionChildComponent} from "../../components/fraction/fraction-child/fraction-child.component";
import {InputEditableElement} from "../../directives/input-editable-element/input-editable-element.directive";
import {SpecialCharFinder} from "../special-char-finder.class";

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

    const charFinder=new SpecialCharFinder(this.currentElement)
    this.from=(charFinder.getPrevSpecialCharData()?.index||-1)+1
    this.to=(charFinder.getNextSpecialCharData()?.index||this.currentElement.lastCharData.index+1)

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
    this.currentElement.replace(this.from, this.to-this.from,[{
      numeratorChildren:this.prevChars,
      denominatorChildren:this.nextChars,
      type:'fraction'
    }])
  }

  private moveCaretToEmptyFractionChild(){
    let appendedFrac=this.currentElement.getRenderedChar(this.from)?.asEditableElement as FractionComponent
    if(!this.nextChars.length)
      return (appendedFrac.denominatorComponent.asEditableElement as FractionChildComponent).noCharData
    return (appendedFrac.numeratorComponent.asEditableElement as FractionChildComponent).noCharData
  }

}
