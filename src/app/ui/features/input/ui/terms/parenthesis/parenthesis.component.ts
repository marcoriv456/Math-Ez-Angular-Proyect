import { Component, forwardRef } from '@angular/core';
import { InputMathElement } from '../../../core/abstracts/input-math-element.abstract';
import { ParenthesisTerm } from '../../../core/models/terms/parenthesis-term.model';

@Component({
  selector: 'parenthesis',
  templateUrl: './parenthesis.component.html',
  styleUrls: [
    './parenthesis.component.css',
    '../../assets/editable-elements-styles.css',
  ],
  providers: [
    {
      provide: InputMathElement,
      useExisting: forwardRef(() => ParenthesisComponent),
    },
  ],
})
export class ParenthesisComponent extends InputMathElement<ParenthesisTerm> {}
