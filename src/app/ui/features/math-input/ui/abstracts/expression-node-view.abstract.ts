import { Directive, ElementRef, inject } from '@angular/core';
import { DomPositionCalculator } from '../../core/helpers/dom-position-calculator.helper';
import { CaretLayout } from '../../core/structures/caret-layout.type';

@Directive()
export abstract class ExpressionNodeView {
  protected readonly _ref: ElementRef<HTMLElement> = inject(ElementRef);

  get CaretLayout(): CaretLayout {
    return {
      X: this._rightBorderPosition,
      Y: this._topBorderPosition,
      Height: this._ref.nativeElement.offsetHeight,
    };
  }

  private get _topBorderPosition() {
    return DomPositionCalculator.PositionY(
      this._ref.nativeElement,
      'APP-MATH-INPUT',
    );
  }

  private get _rightBorderPosition() {
    const leftBorderPosition = DomPositionCalculator.PositionX(
      this._ref.nativeElement,
      'APP-MATH-INPUT',
    );
    const width = this._ref.nativeElement.offsetWidth;
    return leftBorderPosition + width;
  }
}
