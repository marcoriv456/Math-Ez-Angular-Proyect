import {Component, ElementRef, HostBinding, inject, Input, QueryList, ViewChildren} from '@angular/core';
import {InputEditableElement} from "../models/input-editable-element.class";
import {Term} from "../models/term.model";
import {InputTermDirective} from "../directives/input-term.directive";
import {InputUtilitiesService} from "../services/caret-positioning/input-utilities.service";
import {from} from "rxjs";
import {InputCharData} from "../models/input-char-data.model";

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
  inputUtilitiesService=inject(InputUtilitiesService)
  @HostBinding('style.--height')
  get heightToBind(){
    return this.fontSize+'rem'
  }

  override get fontSize(): number {
    return super.fontSize/2;
  }

  @HostBinding('style.--font-size')
  override get fontSizeToBind(){
    return super.fontSizeToBind
  }

  override removeChar(from: number, deleteCount: number = 1): InputCharData|undefined {
    if(this.terms.length)
      return super.removeChar(from, deleteCount);
    this.inputUtilitiesService.elementDeletedEmitter.emit({elementIndex:this.index,residualData:[]})
    return;
  }
}
