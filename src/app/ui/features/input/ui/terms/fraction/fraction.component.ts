import {Component, forwardRef} from '@angular/core';
import {
  FractionDenominatorValidator
} from "../../../core/validation/validators/fraction/fraction-denominator/fraction-denominator.validator";
import {
  FractionNumeratorValidator
} from "../../../core/validation/validators/fraction/fraction-numerator/fraction-numerator.validator";
import {InputMathElement} from "../../../core/abstracts/input-math-element.abstract";
import {FractionTerm} from "../../../core/models/terms/fraction-term.model";

@Component({
  selector: 'frac',
  templateUrl: './fraction.component.html',
  styleUrls: ['./fraction.component.css','../../assets/editable-elements-styles.css'],
  providers: [{provide:InputMathElement, useExisting:forwardRef(()=>FractionComponent)}]
})
export class FractionComponent extends InputMathElement<FractionTerm>{
  protected readonly FractionDenominatorValidator = FractionDenominatorValidator;
  protected readonly FractionNumeratorValidator = FractionNumeratorValidator;
}
