import { Component, forwardRef, Input } from '@angular/core';
import { Fraction } from '../../../../../../core/domain/model/fraction/fraction.model';
import { MathInputNodeView } from '../../abstracts/math-input-node-view.abstract';

@Component({
  selector: 'math-fraction',
  templateUrl: './fraction.component.html',
  styleUrl: './fraction.component.css',
  providers: [
    {
      provide: MathInputNodeView,
      useExisting: forwardRef(() => FractionComponent),
    },
  ],
})
export class FractionComponent extends MathInputNodeView {
  @Input({ required: true }) Fraction!: Fraction;
}
