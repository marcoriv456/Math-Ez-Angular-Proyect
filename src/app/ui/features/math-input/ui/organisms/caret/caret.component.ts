import { Component } from '@angular/core';
import { CaretLayout } from '../../../core/structures/caret-layout.type';

@Component({
  selector: 'math-input-caret',
  templateUrl: './caret.component.html',
  styleUrl: './caret.component.css',
})
export class CaretComponent {
  protected Layout = { left: '0px', top: '0px', height: '100%' };

  public MoveTo(layout: CaretLayout) {
    this.Layout = {
      left: layout.X + 'px',
      top: layout.Y + 'px',
      height: layout.Height + 'px',
    };
  }
}
