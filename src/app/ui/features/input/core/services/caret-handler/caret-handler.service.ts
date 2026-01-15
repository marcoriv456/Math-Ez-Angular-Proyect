import { inject, Injectable } from '@angular/core';
import { InputCharData } from '../../models/input-char-data.model';
import { ContextHandlerService } from '../context-handler/context-handler.service';
import { CaretIndexService } from '../caret-index/caret-index.service';
import { InputEventBusService } from '../input-event-bus/input-event-bus.service';
import { CharClickedEvent } from '../../models/events/io/char-clicked.event';
import { KeyTypedEvent } from '../../models/events/io/key-typed.event';
import { CaretMoveRequestEvent } from '../../models/events/caret/caret-move-request.event';

@Injectable()
export class CaretHandlerService {
  private readonly indexService = inject(CaretIndexService);
  private readonly contextHandler = inject(ContextHandlerService);
  private readonly eventBus = inject(InputEventBusService);

  constructor() {
    this.eventBus
      .on(CharClickedEvent)
      .subscribe(({ charData }) => this.move(charData));
    this.eventBus
      .on(KeyTypedEvent)
      .subscribe(({ key, ctrlKey }) => this.handleKey(key, ctrlKey));
  }

  public handleKey(key: string, ctrlKey: boolean) {
    switch (key) {
      case 'ArrowLeft':
        return ctrlKey ? this.moveToPrevIrregular() : this.moveBackward();
      case 'ArrowRight':
        return ctrlKey ? this.moveToNextIrregular() : this.moveForward();
      case 'Home':
        return ctrlKey ? this.moveToFirstInMain() : this.moveToFirst();
      case 'End':
        return ctrlKey ? this.moveToLastInMain() : this.moveToLast();
    }
  }

  public moveForward() {
    const forward = this.contextHandler.getForwardContextData();
    this.move(forward);
  }

  public moveBackward() {
    const backward = this.contextHandler.getBackwardContextData();
    this.move(backward);
  }

  public moveToFirst() {
    const first = this.contextHandler.getFirstCharData();
    this.move(first);
  }

  public moveToLast() {
    const last = this.contextHandler.getLastCharData();
    this.move(last);
  }

  public moveToFirstInMain() {
    const firstInMain = this.contextHandler.getMainContainerNoCharData();
    this.move(firstInMain);
  }

  public moveToLastInMain() {
    const lastInMain = this.contextHandler.getMainContainerLastCharData();
    this.move(lastInMain);
  }

  public moveToNextIrregular() {
    this.move(this.contextHandler.getNextIrregularCharDataToMoveAt());
  }

  public moveToPrevIrregular() {
    this.move(this.contextHandler.getPrevIrregularCharToMoveAt());
  }

  public move(data: InputCharData) {
    this.eventBus.emit(new CaretMoveRequestEvent(data));
    this.contextHandler.contextElement(data.parent);
    this.indexService.index = data.index;
  }
}
