import { Component, HostListener, ViewChild } from '@angular/core';
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

  @HostListener('keydown', ['$event'])
  protected OnKeyDown(event: KeyboardEvent) {
    let { key } = event;
    if (key !== 'Tab') event.preventDefault();
    if (key.length == 1) this.writeChar(key);
    else if (key.startsWith('Arrow')) this.onArrowPressed(key);
    else if (key == 'Backspace') this.removeChar();
  }

  @HostListener('click')
  protected OnClick() {
    this._termList.SelectLast();
    const selectedElement = this._termList.SelectedElement;
    if (!selectedElement) throw new Error('Cannot find selected element!');
    const elementPosition = selectedElement.PositionX;
    this.moveCaretTo(elementPosition);
  }

  private onArrowPressed(key: string) {
    let positionToMove: number;
    switch (key) {
      case 'ArrowRight':
        this._termList.SelectNext();
        const next = this._termList.SelectedElement;
        if (!next) throw new Error('No next element!');
        positionToMove = next.PositionX;
        break;
      case 'ArrowLeft':
        this._termList.SelectPrev();
        const prev = this._termList.SelectedElement;
        positionToMove = prev ? prev.PositionX : 0;
        break;
      case 'ArrowUp':
        this._termList.SelectLast();
        const last = this._termList.SelectedElement;
        if (!last) throw new Error('No last element!');
        positionToMove = last.PositionX;
        break;
      case 'ArrowDown':
        this._termList.SelectTail();
        positionToMove = 0;
        break;
      default:
        throw new Error('Behaviour for that key not implemented already');
    }
    this.moveCaretTo(positionToMove);
  }

  private removeChar() {
    this._termList.Remove();
    const selection = this._termList.SelectedElement;
    this._caret.moveTo(selection?.PositionX || 0);
  }

  private writeChar(char: string) {
    this._termList.add(char);
    const selectedElement = this._termList.SelectedElement;
    if (!selectedElement) throw new Error('Cannot find selected element!');
    this.moveCaretTo(selectedElement.PositionX);
  }

  private moveCaretTo(x: number) {
    this._caret.moveTo(x);
  }
}
