import {Term} from "../../models/terms/term.model";
import {InputEditableElement} from "../input-editable-element.class";
import {ChangeDetectorRef} from "@angular/core";
import {InputCharData} from "../../models/input-char-data.model";

export class SimpleAdder{
  constructor(
    private readonly currentElement:InputEditableElement,
    private readonly cdr:ChangeDetectorRef,
    private readonly term:Term,
  ) { }

  public appendTerm(replaceFrom=this.currentElement.nextIndex, deleteCount=0):InputCharData{
    this.currentElement.append(replaceFrom,deleteCount,this.term)
    this.cdr.detectChanges()
    let appendedEditableTerm=this.currentElement.getRenderedChar(this.currentElement.nextIndex)?.asEditableElement
    if(appendedEditableTerm)
      return appendedEditableTerm.noCharData||this.currentElement.noCharData
    return this.currentElement.nextCharData||this.currentElement.lastCharData
  }

}
