import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  Output,
  QueryList, ViewChild,
  ViewChildren
} from '@angular/core';
import {InputEditableElement} from "../../../models/input-editable-element.class";
import {InputTermDirective} from "../../../directives/input-term.directive";
import {InputUtilitiesService} from "../../../services/caret-positioning/input-utilities.service";
import {Term} from "../../../models/terms/term.model";
import {InputCharData} from "../../../models/input-char-data.model";
import {TermContainerComponent} from "../../term-container/term-container.component";

@Component({
  selector: 'frac-child',
  templateUrl: './fraction-child.component.html',
  styleUrl: './fraction-child.component.css'
})
export class FractionChildComponent extends InputEditableElement implements AfterViewInit{
  @Input()
  terms!:Term[]
  @ViewChild(TermContainerComponent)
  termContainer!: TermContainerComponent
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

  override removeChars(from: number, deleteCount: number = 1): InputCharData|undefined {
    if(this.terms.length)
      return this.removeSimpleChar(from, deleteCount);
    this.termDeleted.emit()
    return;
  }

  ngAfterViewInit() {
    this.updateRenderedChars()
  }
}
