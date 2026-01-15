import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import Rellax from 'rellax';

@Directive({
  selector: '[ezRellax]',
})
export class RellaxDirective implements OnInit, OnDestroy {
  @Input() speed: number = 1;
  private rellax: any;
  private ref = inject(ElementRef<HTMLElement>);

  ngOnInit() {
    this.rellax = new Rellax(this.ref.nativeElement, {
      speed: this.speed,
    });
  }

  ngOnDestroy() {
    this.rellax.destroy();
  }
}
