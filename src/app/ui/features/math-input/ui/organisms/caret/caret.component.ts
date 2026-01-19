import { Component, ElementRef, inject, OnInit } from '@angular/core';

@Component({
  selector: 'math-input-caret',
  templateUrl: './caret.component.html',
  styleUrl: './caret.component.css',
})
export class CaretComponent {
  protected style = { left: '0px', top: '0px' };
  // private ref = inject(ElementRef).nativeElement as HTMLElement;

  public moveTo(x: number) {
    this.style.left = x + 'px';
    // this.style.height = height + 'px';
    // this.style.top = y + 'px';
  }
}
