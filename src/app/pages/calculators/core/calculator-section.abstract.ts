import {ColorSchema} from "../../../core/models/color-schema.model";
import {AfterViewInit, Directive, ElementRef, EventEmitter, inject, Output} from "@angular/core";

@Directive()
export abstract class CalculatorSection implements AfterViewInit {
  @Output() intersected = new EventEmitter<ColorSchema>();
  protected abstract readonly colorSchema: ColorSchema;
  protected readonly ref: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>)

  private readonly observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting)
      this.intersected.emit(this.colorSchema)
  }, {threshold: 0.4})

  ngAfterViewInit() {
    this.observer.observe(this.ref.nativeElement)
  }


}
