import {
  AfterViewInit, ChangeDetectorRef,
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
  styleUrls: ['./fraction-child.component.css','../../../assets/editable-elements-styles.css']
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
  @Input()
  type!:'numerator'|'denominator'

  cdr=inject(ChangeDetectorRef)

  override removeChars(from: number, deleteCount: number = 1): InputCharData|undefined {
    if(this.terms.length)
      return this.removeSimpleChar(from, deleteCount);
    this.termDeleted.emit()
    return;
  }

  ngAfterViewInit() {
    this.updateTermsValidation()
  }
  override get noCharData(): InputCharData {
    let data=super.noCharData
    this.cdr.detectChanges()
    data.positionX = this.terms.length==0 ?
      data.positionX+this.ref.offsetWidth/2 : (this.renderedChars.get(0)?.leftPosition||0)
    return data
  }
}
