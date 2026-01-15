import { Component, Input } from '@angular/core';

@Component({
  selector: 'ez-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() icon!: string;
}
