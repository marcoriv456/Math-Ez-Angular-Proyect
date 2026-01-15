import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  inject,
  Input,
  Optional,
  SkipSelf,
} from '@angular/core';
import { InputCharData } from '../../../core/models/input-char-data.model';
import { InputMathElement } from '../../../core/abstracts/input-math-element.abstract';
import { InputEventBusService } from '../../../core/services/input-event-bus/input-event-bus.service';
import { CharClickedEvent } from '../../../core/models/events/io/char-clicked.event';
import { TermSection } from '../../../core/models/term-section.model';

@Directive({
  selector: '[inputTerm]',
})
export class InputTermDirective {
  @Input() index!: number;

  constructor(
    @Host() @Optional() public asMathElement: InputMathElement<any> | null,
    @SkipSelf() @Optional() public parent: TermSection,
  ) {}

  private ref = inject(ElementRef).nativeElement as HTMLElement;
  private readonly eventBus = inject(InputEventBusService);

  get data(): InputCharData {
    return {
      positionX: this.rightPosition,
      index: this.index,
      parent: this.parent,
    };
  }

  get rightPosition() {
    return this.leftPosition + this.ref.offsetWidth;
  }

  get leftPosition() {
    let parent: HTMLElement | null = this.ref.parentElement;
    let leftPosition = this.ref.offsetLeft;
    while (parent && !(parent.tagName == 'APP-INPUT')) {
      leftPosition += parent.offsetLeft || 0;
      parent = parent.parentElement;
    }
    return leftPosition;
  }

  @HostListener('click', ['$event'])
  private onClick(event: MouseEvent) {
    event.stopPropagation();
    const clickPosition = event.offsetX;
    const dataToSend = this.getClickedCharData(clickPosition);

    this.eventBus.emit(new CharClickedEvent(dataToSend));
  }

  private getClickedCharData(clickPosition: number) {
    let charData = this.data;

    if (this.wasClickOnLeftSide(clickPosition)) {
      charData.positionX = this.leftPosition;
      charData.index -= 1;
    }

    return charData;
  }

  private wasClickOnLeftSide(clickPosition: number) {
    return this.ref.offsetWidth / 2 > clickPosition;
  }
}
