import {ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {InputEditableElement} from "../../../models/input-editable-element.class";
import {Term} from "../../../models/terms/term.model";
import {TermContainerComponent} from "../../term-container/term-container.component";
import {InputUtilitiesService} from "../../../services/caret-positioning/input-utilities.service";
import {InputCharData} from "../../../models/input-char-data.model";

@Component({
  selector: 'root-main-container',
  templateUrl: './root-main-container.component.html',
  styleUrl: './root-main-container.component.css'
})
export class RootMainContainerComponent extends InputEditableElement{
  @Input()
  parent!: InputEditableElement;
  @Input()
  index!:number;
  @Input()
  terms!:Term[];
  @ViewChild(TermContainerComponent)
  termContainer!: TermContainerComponent;
  ref=inject(ElementRef).nativeElement as HTMLElement;
  inputUtilitiesService=inject(InputUtilitiesService);

  @Output()
  termDeleted=new EventEmitter<void>()
  override removeChars(from: number, deleteCount: number = 1): InputCharData|undefined {
    if(this.terms.length)
      return this.removeSimpleChar(from, deleteCount);
    this.termDeleted.emit()
    return;
  }
}
