import {Component, Input, QueryList, ViewChildren} from '@angular/core';
import {InputEditableElement} from "../../classes/input-editable-element";
import {InputTermDirective} from "../../directives/input-term.directive";
import {Term} from "../../input.component";

@Component({
  selector: 'frac-denominator',
  templateUrl: './denominator.component.html',
  styleUrl: './denominator.component.css'
})
export class DenominatorComponent extends InputEditableElement{
  @Input()
  terms!:Term[]
  @ViewChildren(InputTermDirective)
  renderedChars!:QueryList<InputTermDirective>
}
