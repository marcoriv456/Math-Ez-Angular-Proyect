import {Component, ElementRef, HostBinding, inject, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {InputEditableElement} from "../../models/input-editable-element.class";
import {Term} from "../../models/terms/term.model";
import {InputTermDirective} from "../../directives/input-term.directive";
import {InputUtilitiesService} from "../../services/caret-positioning/input-utilities.service";
import {from} from "rxjs";
import {InputCharData} from "../../models/input-char-data.model";
import {TermContainerComponent} from "../term-container/term-container.component";

@Component({
  selector: 'exp',
  templateUrl: './exponent.component.html',
  styleUrls: ['./exponent.component.css','../../assets/editable-elements-styles.css']
})
export class ExponentComponent extends InputEditableElement{
  @Input()
  terms!:Term[]
  @ViewChild(TermContainerComponent)
  termContainer!: TermContainerComponent;
  @Input()
  parent!:InputEditableElement
  @Input()
  index!:number
  ref=inject(ElementRef).nativeElement as HTMLElement
  inputUtilitiesService=inject(InputUtilitiesService)
}
