import {Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {InputEditableElement} from "../../models/input-editable-element.class";
import {Term} from "../../models/terms/term.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {InputUtilitiesService} from "../../services/caret-positioning/input-utilities.service";
import {InputCharData} from "../../models/input-char-data.model";

@Component({
  selector: 'argument',
  templateUrl: './term-argument.component.html',
  styleUrls: ['./term-argument.component.css','../../assets/editable-elements-styles.css']
})
export class TermArgumentComponent extends InputEditableElement{
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

  override removeChars(from: number, deleteCount: number = 1): InputCharData | undefined {
    return this.removeSimpleChar(from, deleteCount);
  }
}
