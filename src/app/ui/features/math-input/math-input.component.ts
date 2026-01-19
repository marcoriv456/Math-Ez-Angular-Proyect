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
  }

  @HostListener('click')
  protected OnClick() {
    const selectedElement = this._termList.SelectedElement;
    if (!selectedElement) throw new Error('Cannot find selected element!');
    const elementPosition = selectedElement.Value.PositionX;
    this.moveCaretTo(elementPosition);
  }

  private writeChar(char: string) {
    this._termList.add(char);
    const selectedElement = this._termList.SelectedElement;
    if (!selectedElement) throw new Error('Cannot find selected element!');
    this.moveCaretTo(selectedElement.Value.PositionX);
  }

  private moveCaretTo(x: number) {
    this._caret.moveTo(x);
  }
}
