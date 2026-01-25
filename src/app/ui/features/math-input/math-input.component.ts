import { Component, HostListener, ViewChild } from '@angular/core';
import { RootExpression } from '../../../core/domain/model/expression/root-expression.model';
import { ExpressionInputIntepreter } from './core/helpers/expression-input-interpreter.helper';
import { TermListComponent } from './ui/atoms/term-list/term-list.component';
import { CaretComponent } from './ui/organisms/caret/caret.component';

@Component({
  selector: 'app-math-input',
  templateUrl: './math-input.component.html',
  styleUrl: './math-input.component.css',
  host: { '[attr.tabindex]': '0' },
})
export class MathInputComponent {
  @ViewChild(TermListComponent) _termList!: TermListComponent;
  @ViewChild(CaretComponent) _caret!: CaretComponent;

  protected readonly _root = new RootExpression();

  @HostListener('keydown', ['$event'])
  protected OnKeyDown(event: KeyboardEvent) {
    let { key } = event;
    if (key !== 'Tab') event.preventDefault();
    if (key.length == 1) this.WriteChar(key);
    else if (key.startsWith('Arrow')) this.OnArrowPressed(key);
    else if (key == 'Backspace') this.RemoveChar();
  }

  @HostListener('click')
  protected OnClick() {
    const lastPosition = this._termList.GoEnd();
    this.MoveCaretTo(lastPosition);
  }

  private OnArrowPressed(key: string) {
    const newPosition = this.GoToArrowDirection(key);
    this.MoveCaretTo(newPosition);
  }

  private GoToArrowDirection(key: string) {
    switch (key) {
      case 'ArrowRight':
        return this._termList.GoForward();
      case 'ArrowLeft':
        return this._termList.GoBackward();
      case 'ArrowUp':
        return this._termList.GoEnd();
      case 'ArrowDown':
        return this._termList.GoStart();
      default:
        throw new Error('Behaviour for that key not implemented already');
    }
  }

  private RemoveChar() {
    const remainingPosition = this._termList.Remove();
    this.MoveCaretTo(remainingPosition);
  }

  private WriteChar(char: string) {
    const node = ExpressionInputIntepreter.interpret(char);
    const charPosition = this._termList.Add(node);
    this.MoveCaretTo(charPosition);
  }

  private MoveCaretTo(x: number) {
    this._caret.MoveTo(x);
  }
}
