import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {InputEditableElement} from "../../models/input-editable-element.class";
import {InputTermDirective} from "../../directives/input-term.directive";
import {InputUtilitiesService} from "../../services/caret-positioning/input-utilities.service";
import {Term} from "../../models/terms/term.model";
import {TermContainerComponent} from "../term-container/term-container.component";

@Component({
  selector: 'frac',
  templateUrl: './fraction.component.html',
  styleUrl: './fraction.component.css'
})
export class FractionComponent extends InputEditableElement{
  @Input()
  index!:number
  @Input()
  numeratorChildren!:Term[]
  @Input()
  denominatorChildren!:Term[]
  @Input()
  terms:Term[]=[]
  @ViewChildren(InputTermDirective)
  _renderedChars!:QueryList<InputTermDirective>
  termContainer!:TermContainerComponent;
  override get renderedChars(){
    return this._renderedChars
  }
  override editable=false
  @Input()
  parent!: InputEditableElement;
  ref=inject(ElementRef).nativeElement as HTMLElement;
  inputUtilitiesService=inject(InputUtilitiesService)

  get numeratorComponent() {
    return this.renderedChars.get(0) as InputTermDirective
  }
  get denominatorComponent() {
    return this.renderedChars.get(1) as InputTermDirective
  }
}
