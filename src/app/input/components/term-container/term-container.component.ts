import {Component, Input, QueryList, ViewChildren} from '@angular/core';
import {Term} from "../../models/terms/term.model";
import {InputEditableElement} from "../../classes/input-editable-element.class";
import {InputTermDirective} from "../../directives/input-term.directive";

@Component({
  selector: 'term-container',
  templateUrl: './term-container.component.html',
  styleUrl: './term-container.component.css'
})
export class TermContainerComponent {
  @Input()
  terms!:Term[]
  @Input()
  parent!:InputEditableElement
  @ViewChildren(InputTermDirective)
  renderedChars!: QueryList<InputTermDirective>

}
