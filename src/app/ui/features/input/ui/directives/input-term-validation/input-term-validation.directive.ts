import {
  Directive,
  ElementRef,
  Host,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { Term } from '../../../core/models/terms/term.model';
import { Subject } from 'rxjs';
import { InputMathElement } from '../../../core/abstracts/input-math-element.abstract';
import { CharComponent } from '../../terms/char/char.component';
import { TermValidator } from '../../../core/validation/abstracts/validator.abstract';
import { TermValidationData } from '../../../core/validation/models/term-validation-data.model';
import { InputEventBusService } from '../../../core/services/input-event-bus/input-event-bus.service';
import { WarningShowRequestEvent } from '../../../core/models/events/warnings/warning-show-request.event';
import { WarningHideRequestEvent } from '../../../core/models/events/warnings/warning-hide-request.event';
import { TermSection } from '../../../core/models/term-section.model';

@Directive({
  selector: '[inputTermValidation]',
})
export class InputTermValidationDirective implements OnInit, OnDestroy {
  @Input('inputTermValidation')
  public validatorClass!: { new (term: Term): TermValidator };

  private term!: Term;
  private validationRequester?: Subject<void>;
  private validationData!: TermValidationData;
  private isMouseOver = false;

  private readonly ref = inject(ElementRef).nativeElement as HTMLElement;
  private readonly eventBus = inject(InputEventBusService);

  constructor(
    @Host() @Optional() private mathElementHost: InputMathElement<any> | null,
    @Host() @Optional() private containerHost: TermSection | null,
    @Host() @Optional() private charHost: CharComponent | null,
  ) {}

  ngOnInit() {
    this.setupWithHostData();
    this.updateValidation();
    this.validationRequester?.subscribe(() => this.updateValidation());
  }

  ngOnDestroy() {
    if (this.isMouseOver) this.emitHideWarning();
  }

  private get validatorInstance(): TermValidator {
    return new this.validatorClass(this.term);
  }

  private get left() {
    return this.ref.getBoundingClientRect().left + this.ref.offsetWidth / 2;
  }

  private get top() {
    return this.ref.getBoundingClientRect().top;
  }

  private setupWithHostData() {
    if (!this.charHost && !this.mathElementHost && !this.containerHost)
      throw new Error(
        'Misplaced directive, host is not a Math Term, Container nor a character',
      );

    if (this.charHost) this.term = { type: 'char', char: this.charHost.char };
    else if (this.mathElementHost) {
      this.term = this.mathElementHost.term;
      this.validationRequester = this.mathElementHost.validationRequester;
    } else if (this.containerHost) {
      this.term = this.containerHost.mathElement.term;
      this.validationRequester =
        this.containerHost.mathElement.validationRequester;
    }
  }

  @HostBinding('class')
  private get validityClassBinding() {
    return this.validationData.type;
  }

  @HostListener('mouseover')
  private onMouseOver() {
    if (this.validationData.isValid) return;
    this.emitShowWarning();
    this.isMouseOver = true;
  }

  @HostListener('mouseleave')
  private onMouseLeave() {
    if (this.validationData.isValid) return;
    this.emitHideWarning();
    this.isMouseOver = false;
  }

  private updateValidation() {
    this.validationData = this.validatorInstance.validate();
    if (this.isMouseOver)
      this.validationData.isValid
        ? this.emitHideWarning()
        : this.emitShowWarning();
  }

  private emitShowWarning() {
    this.eventBus.emit(
      new WarningShowRequestEvent({
        messages: this.validationData.messages || [],
        position: { x: this.left, y: this.top },
      }),
    );
  }

  private emitHideWarning() {
    this.eventBus.emit(new WarningHideRequestEvent());
  }
}
