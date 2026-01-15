import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'calculators-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
export class TopicCardComponent {
  @Input() @HostBinding('style.--card-color') color: string =
    'hsl(200, 100%, 50%)';
}
