import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { RootExpression } from '../../../core/domain/model/expression/root-expression.model';
import { CharacterClickEvent } from './core/events/character-click.event';
import { ExpressionInputIntepreter } from './core/helpers/expression-input-interpreter.helper';
import { MathInputEventBusService } from './core/services/math-input-event-bus/math-input-event-bus.service';
import { ExpressionComponent } from './ui/atoms/expression/expression.component';
import { CaretComponent } from './ui/organisms/caret/caret.component';

@Component({
  selector: 'app-math-input',
  templateUrl: './math-input.component.html',
  styleUrl: './math-input.component.css',
  host: { '[attr.tabindex]': '0' },
})
export class MathInputComponent implements AfterViewInit {
  @ViewChild(ExpressionComponent) _expresssionView!: ExpressionComponent;
  @ViewChild(CaretComponent) _caret!: CaretComponent;
  private readonly ref: ElementRef<HTMLElement> = inject(
    ElementRef<HTMLElement>,
  );

  private readonly _eventBus = inject(MathInputEventBusService);
  private readonly _cdr = inject(ChangeDetectorRef);

  protected readonly _root = new RootExpression();

  ngAfterViewInit(): void {
    this.ref.nativeElement.focus();
    this._eventBus.on(CharacterClickEvent).subscribe(() => this.UpdateCaret());
  }

  @HostListener('keydown', ['$event'])
  protected OnKeyDown(event: KeyboardEvent) {
    let { key } = event;
    if (key !== 'Tab') event.preventDefault();
    if (key.length == 1) this.WriteChar(key);
    else if (key.startsWith('Arrow')) this.OnArrowPressed(key);
    else if (key == 'Backspace') this.RemoveChar();
    this.UpdateCaret();
  }

  @HostListener('click')
  protected OnClick() {
    this._expresssionView.GoEnd();
    this.UpdateCaret();
  }

  private OnArrowPressed(key: string) {
    this.GoToArrowDirection(key);
  }

  private GoToArrowDirection(key: string) {
    switch (key) {
      case 'ArrowRight':
        return this._expresssionView.GoForward();
      case 'ArrowLeft':
        return this._expresssionView.GoBackward();
      case 'ArrowUp':
        return this._expresssionView.GoEnd();
      case 'ArrowDown':
        return this._expresssionView.GoStart();
      default:
        throw new Error('Behaviour for that key not implemented already');
    }
  }

  private RemoveChar() {
    this._expresssionView.Remove();
  }

  private WriteChar(char: string) {
    const node = ExpressionInputIntepreter.interpret(char);
    this._expresssionView.Add(node);
  }

  private UpdateCaret() {
    this._cdr.detectChanges();
    this._caret.MoveTo(this._expresssionView.CaretLayout);
  }
}
