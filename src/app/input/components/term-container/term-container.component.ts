import {Component, Input, QueryList, ViewChildren} from '@angular/core';
import {Term} from "../../models/terms/term.model";
import {InputTermDirective} from "../../directives/input-term/input-term.directive";
import {InputEditableElement} from "../../directives/input-editable-element/input-editable-element.directive";
import {CharValidator} from "../../validation/validators/char.validator";

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

  protected readonly CharValidator = CharValidator;
}
