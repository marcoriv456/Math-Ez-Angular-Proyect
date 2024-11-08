import {Component, ElementRef, inject, Input, QueryList, ViewChildren} from '@angular/core';
import {InputEditableElement} from "../../classes/input-editable-element";
import {InputTermDirective} from "../../directives/input-term.directive";
import {Term} from "../../input.component";
import {CaretPositioningService} from "../../services/caret-positioning/caret-positioning.service";

@Component({
  selector: 'frac-numerator',
  templateUrl: './numerator.component.html',
  styleUrl: './numerator.component.css'
})
export class NumeratorComponent extends InputEditableElement{
  @Input()
  terms!:Term[]
  @ViewChildren(InputTermDirective)
  renderedChars!:QueryList<InputTermDirective>
  @Input()
  parent!:InputEditableElement
  @Input()
  index!:number
  ref=inject(ElementRef).nativeElement as HTMLElement
  caretPos=inject(CaretPositioningService)

  override get position(): number {
    console.log("on position: ", this.ref.getBoundingClientRect().left-this.caretPos.inputRef.ref.getBoundingClientRect().left)
    return this.ref.getBoundingClientRect().left- this.caretPos.inputRef.ref.getBoundingClientRect().left
  }
}
