import {Term} from "../../models/terms/term.model";
import {FractionComponent} from "../../components/fraction/fraction.component";
import {ChangeDetectorRef} from "@angular/core";
import {InputCharData} from "../../models/input-char-data.model";
import {FractionChildComponent} from "../../components/fraction/fraction-child/fraction-child.component";
import {InputEditableElement} from "../../directives/input-editable-element/input-editable-element.directive";
import {SpecialCharFinder} from "../special-char-finder.helper";

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
  private numeratorChars!:Term[]
  private denominatorChars!:Term[]

  private setupFractionData(){
    this.origin=this.currentElement.nextIndex

    const charFinder=new SpecialCharFinder(this.currentElement.nextIndex,this.currentElement.terms)
    this.from=charFinder.findPrevious()+1
    this.to=charFinder.findNext()+1

    this.numeratorChars=this.currentElement.terms.slice(this.from,this.origin)
    this.denominatorChars=this.currentElement.terms.slice(this.origin,this.to)
  }

  public appendFraction():InputCharData{
    this.appendFractionToCurrentElement()

    this.cdr.detectChanges()

    return this.moveCaretToFractionChild()
  }

  private appendFractionToCurrentElement(){
    this.currentElement.replace(this.from, this.to-this.from,[{
      numeratorChildren:this.numeratorChars,
      denominatorChildren:this.denominatorChars,
      type:'fraction'
    }])
  }

  private moveCaretToFractionChild(){
    let appendedFrac=this.currentElement.getRenderedChar(this.from)?.asEditableElement as FractionComponent
    if(!this.numeratorChars.length)
      return (appendedFrac.numeratorComponent.asEditableElement as FractionChildComponent).noCharData
    return (appendedFrac.denominatorComponent.asEditableElement as FractionChildComponent).noCharData
  }

}
