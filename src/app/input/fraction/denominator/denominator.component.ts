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
import {InputEditableElement} from "../../classes/input-editable-element";
import {InputTermDirective} from "../../directives/input-term.directive";
import {Term} from "../../input.component";
import {CaretPositioningService} from "../../services/caret-positioning/caret-positioning.service";
import {InputCharData} from "../../char/char.component";

@Component({
  selector: 'frac-denominator',
  templateUrl: './denominator.component.html',
  styleUrl: './denominator.component.css'
})
export class DenominatorComponent extends InputEditableElement{
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

  @Output()
  termDeleted=new EventEmitter<void>

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
    this.termDeleted.emit()
    return;
  }
}
