import {Term} from "../../models/terms/term.model";
import {ChangeDetectorRef} from "@angular/core";
import {InputCharData} from "../../models/input-char-data.model";
import {InputEditableElement} from "../../directives/input-editable-element/input-editable-element.directive";

export class SimpleAdder{
  constructor(
    private readonly currentElement:InputEditableElement,
    private readonly cdr:ChangeDetectorRef,
    private readonly term:Term,
  ) { }

  public appendTerm(index=this.currentElement.nextIndex):InputCharData{
    this.currentElement.append([this.term],index)
    this.cdr.detectChanges()
    let appendedEditableTerm=this.currentElement.getRenderedChar(this.currentElement.nextIndex)?.asEditableElement
    if(appendedEditableTerm)
      return appendedEditableTerm.noCharData||this.currentElement.noCharData
    return this.currentElement.nextCharData||this.currentElement.lastCharData
  }

}
