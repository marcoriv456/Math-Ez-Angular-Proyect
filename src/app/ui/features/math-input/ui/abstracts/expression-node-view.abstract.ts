import { Directive, ElementRef, inject } from '@angular/core';
import { DomPositionCalculator } from '../../core/helpers/dom-position-calculator.helper';

@Directive()
export abstract class ExpressionNodeView {
  protected readonly _ref: ElementRef<HTMLElement> = inject(ElementRef);

  get LeftBorderPosition() {
    return DomPositionCalculator.PositionX(
      this._ref.nativeElement,
      'APP-MATH-INPUT',
    );
  }

  get RightBorderPosition() {
    const width = this._ref.nativeElement.offsetWidth;
    return this.LeftBorderPosition + width;
  }
}
