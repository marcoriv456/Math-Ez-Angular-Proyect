import {Component, Input, QueryList, ViewChildren} from '@angular/core';
import {Term} from "../../models/terms/term.model";
import {InputTermDirective} from "../../directives/input-term/input-term.directive";
import {InputEditableElement} from "../../directives/input-editable-element/input-editable-element.directive";
import {CharValidator} from "../../validation/validators/char/char.validator";
import {ExponentValidator} from "../../validation/validators/exponent/exponent.validator";
import {FractionValidator} from "../../validation/validators/fraction/fraction.validator";
import {getFunctionValidator} from "../../validation/validators/functions/get-function-validator.helper";
import {RootValidator} from "../../validation/validators/root/root.validator";
import {EditableTermContainerComponent} from "../editable-term-container/editable-term-container.component";

@Component({
  selector: 'term-container',
  templateUrl: './term-container.component.html',
  styleUrl: './term-container.component.css'
})
export class TermContainerComponent {
  @Input()
  terms!:Term[]
  @Input()
  parent!:EditableTermContainerComponent
  @ViewChildren(InputTermDirective)
  renderedChars!: QueryList<InputTermDirective>

  protected readonly ExponentValidator = ExponentValidator;
  protected readonly CharValidator = CharValidator;
  protected readonly FractionValidator = FractionValidator;
    protected readonly getFunctionValidator = getFunctionValidator;
  protected readonly RootValidator = RootValidator;
}
