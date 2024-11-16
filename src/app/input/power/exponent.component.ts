import {Component, ElementRef, HostBinding, inject, Input, QueryList, ViewChildren} from '@angular/core';
import {InputEditableElement} from "../models/input-editable-element.class";
import {Term} from "../models/term.model";
import {InputTermDirective} from "../directives/input-term.directive";
import {InputUtilitiesService} from "../services/caret-positioning/input-utilities.service";

@Component({
  selector: 'exp',
  templateUrl: './exponent.component.html',
  styleUrl: './exponent.component.css'
})
export class ExponentComponent extends InputEditableElement{
  @Input()
  terms!:Term[]
  @ViewChildren(InputTermDirective)
  renderedChars!:QueryList<InputTermDirective>
  @Input()
  parent!:InputEditableElement
  @Input()
  index!:number
  ref=inject(ElementRef).nativeElement as HTMLElement
  caretPositioningService=inject(InputUtilitiesService)

  override get fontSize(): number {
    return super.fontSize/2;
  }

  @HostBinding('style.--font-size')
  override get fontSizeToBind(){
    return super.fontSizeToBind
  }
}
