import { Component, HostListener, ViewChild } from '@angular/core';
import { TermListComponent } from './ui/atoms/term-list/term-list.component';

@Component({
  selector: 'app-math-input',
  templateUrl: './math-input.component.html',
  styleUrl: './math-input.component.css',
  host: { '[attr.tabindex]': '0' },
})
export class MathInputComponent {
  @ViewChild(TermListComponent) termList!: TermListComponent;

  @HostListener('keydown', ['$event'])
  protected onKeyDown(event: KeyboardEvent) {
    let { key } = event;
    if (key !== 'Tab') event.preventDefault();
    if (key.length == 1) this.termList.add(event.key);
  }
}
