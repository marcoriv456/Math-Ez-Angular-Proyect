import {Component, ElementRef, HostBinding, inject, Input, QueryList, ViewChildren} from '@angular/core';
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
  caretPositioningService=inject(CaretPositioningService)

  override get position(): number {
    return this.ref.getBoundingClientRect().left- this.caretPositioningService.inputPosition
  }

  override get fontSize(){
    return super.fontSize/2;
  }
  @HostBinding('style.--font-size')
  override get fontSizeToBind(){
    return super.fontSizeToBind
  }

}
