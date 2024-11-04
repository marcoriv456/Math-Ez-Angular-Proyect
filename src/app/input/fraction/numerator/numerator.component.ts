import {Component, Input, QueryList, ViewChildren} from '@angular/core';
import {InputEditableElement} from "../../classes/input-editable-element";
import {InputTermDirective} from "../../directives/input-term.directive";
import {Term} from "../../input.component";

@Component({
  selector: 'frac-numerator',
  templateUrl: './numerator.component.html',
  styleUrl: './numerator.component.css'
})
export class NumeratorComponent extends InputEditableElement{
  @Input()
  terms!:Term[]
  @ViewChildren(InputTermDirective)
  renderedChars!:QueryList<InputTermDirective>

}
