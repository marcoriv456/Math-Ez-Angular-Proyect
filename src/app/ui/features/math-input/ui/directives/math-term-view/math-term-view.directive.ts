import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { DomPositionCalculator } from '../../../core/helpers/dom-position-calculator.helper';

@Directive({
  selector: '[MathTermView]',
  exportAs: 'MathTermViewRef',
})
export class MathTermViewDirective {
  @Input({ required: true }) public Index!: number;
  private readonly _ref: ElementRef<HTMLElement> = inject(ElementRef);

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
