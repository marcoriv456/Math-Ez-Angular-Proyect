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
import {InputEditableElement} from "../../classes/input-editable-element.class";
import {InputTermDirective} from "../../directives/input-term.directive";
import {CharClickedNotifierService} from "../../services/char-clicked-notifier/char-clicked-notifier.service";
import {Term} from "../../models/terms/term.model";
import {TermContainerComponent} from "../term-container/term-container.component";

@Component({
  selector: 'frac',
  templateUrl: './fraction.component.html',
  styleUrls: ['./fraction.component.css','../../assets/editable-elements-styles.css']
})
export class FractionComponent extends InputEditableElement{
  termContainer!: TermContainerComponent;

  @Input()
  numeratorChildren!:Term[]
  @Input()
  denominatorChildren!:Term[]
  @ViewChildren(InputTermDirective)
  _renderedChars!:QueryList<InputTermDirective>
  override get renderedChars(){
    return this._renderedChars
  }
  override editable=false
  get numeratorComponent() {
    return this.renderedChars.get(0) as InputTermDirective
  }
  get denominatorComponent() {
    return this.renderedChars.get(1) as InputTermDirective
  }
}
