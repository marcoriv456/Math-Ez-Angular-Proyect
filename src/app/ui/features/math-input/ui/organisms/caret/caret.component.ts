import { Component } from '@angular/core';

@Component({
  selector: 'math-input-caret',
  templateUrl: './caret.component.html',
  styleUrl: './caret.component.css',
})
export class CaretComponent {
  protected Style = { left: '0px', top: '0px' };

  public MoveTo(x: number) {
    this.Style.left = x + 'px';
  }
}
