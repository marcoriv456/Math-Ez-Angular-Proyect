import {Component, Input, QueryList, ViewChildren} from '@angular/core';
import {Term} from "../../../core/models/terms/term.model";
import {InputTermDirective} from "../../directives/input-term/input-term.directive";
import {CharValidator} from "../../../core/validation/validators/char/char.validator";
import {ExponentValidator} from "../../../core/validation/validators/exponent/exponent.validator";
import {FractionValidator} from "../../../core/validation/validators/fraction/fraction.validator";
import {getFunctionValidator} from "../../../core/validation/validators/function/get-function-validator.helper";
import {RootValidator} from "../../../core/validation/validators/root/root.validator";
import {
  EditableTermContainerComponent
} from "../../molecules/editable-term-container/editable-term-container.component";

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
