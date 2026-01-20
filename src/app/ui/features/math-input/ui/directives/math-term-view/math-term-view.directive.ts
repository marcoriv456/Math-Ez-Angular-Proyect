import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: '[MathTermView]',
})
export class MathTermViewDirective {
  @Input({ required: true }) public Index!: number;
  private readonly _ref: ElementRef<HTMLElement> = inject(ElementRef);
  get PositionX() {
    let parent: HTMLElement | null = this._ref.nativeElement.parentElement;
    let leftPosition = this._ref.nativeElement.offsetLeft;
    while (parent && parent.tagName != 'APP-MATH-INPUT') {
      leftPosition += parent.offsetLeft || 0;
      parent = parent.parentElement;
    }
    return leftPosition + this._ref.nativeElement.offsetWidth;
  }
}
