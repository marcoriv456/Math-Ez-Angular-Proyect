import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {InputEditableElement} from "../../models/input-editable-element.class";
import {InputTermDirective} from "../../directives/input-term.directive";
import {InputUtilitiesService} from "../../services/caret-positioning/input-utilities.service";
import {Term} from "../../models/terms/term.model";
import {InputCharData} from "../../models/input-char-data.model";

@Component({
  selector: 'frac-child',
  templateUrl: './fraction-child.component.html',
  styleUrl: './fraction-child.component.css'
})
export class FractionChildComponent extends InputEditableElement{
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

  @Output()
  termDeleted=new EventEmitter<void>

  override get fontSize(){
    return super.fontSize/2;
  }
  @HostBinding('style.--font-size')
  override get fontSizeToBind(){
    return super.fontSizeToBind
  }

  override removeChar(from: number, deleteCount: number = 1): InputCharData|undefined {
    if(this.terms.length)
      return super.removeChar(from, deleteCount);
    this.termDeleted.emit()
    return;
  }
}
