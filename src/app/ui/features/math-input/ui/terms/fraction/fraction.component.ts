import { Component, forwardRef, Input } from '@angular/core';
import { Fraction } from '../../../../../../core/domain/model/fraction/fraction.model';
import { CompositeExpressionNodeView } from '../../abstracts/composite-expression-node-view.abstract';
import { ExpressionNodeView } from '../../abstracts/expression-node-view.abstract';

@Component({
  selector: 'math-fraction',
  templateUrl: './fraction.component.html',
  styleUrl: './fraction.component.css',
  providers: [
    {
      provide: ExpressionNodeView,
      useExisting: forwardRef(() => FractionComponent),
    },
  ],
})
export class FractionComponent extends CompositeExpressionNodeView {
  @Input({ required: true }) Fraction!: Fraction;
  get Node() {
    return this.Fraction;
  }
}
