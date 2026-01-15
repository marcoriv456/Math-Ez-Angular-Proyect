import { Component, Input } from '@angular/core';

@Component({
  selector: 'home-topic-button',
  templateUrl: './topic-button.component.html',
  styleUrl: './topic-button.component.css',
})
export class TopicButtonComponent {
  @Input() icon!: string;
  @Input() label!: string;
}
