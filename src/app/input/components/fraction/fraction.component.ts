import {Component, Input, QueryList, ViewChildren} from '@angular/core';
import {InputTermDirective} from "../../directives/input-term/input-term.directive";
import {Term} from "../../models/terms/term.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {InputEditableElement} from "../../directives/input-editable-element/input-editable-element.directive";
import {FractionValidator} from "../../validation/validators/fraction/fraction.validator";
import {
  InputNonEditableElement
} from "../../directives/input-non-editable-element/input-non-editable-element.directive";
import {
  FractionDenominatorValidator
} from "../../validation/validators/fraction/fraction-denominator/fraction-denominator.validator";
import {
  FractionNumeratorValidator
} from "../../validation/validators/fraction/fraction-numerator/fraction-numerator.validator";

@Component({
  selector: 'frac',
  templateUrl: './fraction.component.html',
  styleUrls: ['./fraction.component.css','../../assets/editable-elements-styles.css']
})
export class FractionComponent extends InputNonEditableElement{
  @Input()
  numeratorChildren!:Term[]
  @Input()
  denominatorChildren!:Term[]
  override get renderedChars(){
    return this._renderedChars
  }
  get numeratorComponent() {
    return this.renderedChars.get(0) as InputTermDirective
  }
  get denominatorComponent() {
    return this.renderedChars.get(1) as InputTermDirective
  }

  protected readonly FractionDenominatorValidator = FractionDenominatorValidator;
  protected readonly FractionNumeratorValidator = FractionNumeratorValidator;
}
