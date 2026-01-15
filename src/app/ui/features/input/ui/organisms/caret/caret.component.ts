import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { InputCharData } from '../../../core/models/input-char-data.model';
import { InputEventBusService } from '../../../core/services/input-event-bus/input-event-bus.service';
import { CaretMoveRequestEvent } from '../../../core/models/events/caret/caret-move-request.event';

@Component({
  selector: 'caret',
  templateUrl: './caret.component.html',
  styleUrl: './caret.component.css',
})
export class CaretComponent implements OnInit {
  protected style = { height: '0px', left: '0px', top: '0px' };
  private ref = inject(ElementRef).nativeElement as HTMLElement;
  private eventBus = inject(InputEventBusService);

  ngOnInit() {
    this.eventBus
      .on(CaretMoveRequestEvent)
      .subscribe((event) => this.moveTo(event.charData));
  }

  private moveTo({ positionX, parent }: InputCharData) {
    this.style.left = positionX + 'px';
    this.style.height = parent.size + 'px';
    this.style.top =
      parent.clientY - this.ref.getBoundingClientRect().top + 'px';
  }
}
