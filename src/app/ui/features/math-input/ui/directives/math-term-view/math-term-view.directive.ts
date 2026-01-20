import { Directive, ElementRef, inject, Input } from '@angular/core';
import { DomPositionCalculator } from '../../../core/helpers/dom-position-calculator.helper';

@Directive({
  selector: '[MathTermView]',
})
export class MathTermViewDirective {
  @Input({ required: true }) public Index!: number;
  private readonly _ref: ElementRef<HTMLElement> = inject(ElementRef);

  get PositionX() {
    const leftPosition = DomPositionCalculator.PositionX(
      this._ref.nativeElement,
      'APP-MATH-INPUT',
    );
    const width = this._ref.nativeElement.offsetWidth;
    return leftPosition + width;
  }
}
