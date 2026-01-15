import { Injectable } from '@angular/core';
import { EventBus } from '../../../../../../core/abstracts/event-bus.abstract';
import { MathInputEvent } from '../../models/events/base/input-event.model';

@Injectable()
export class InputEventBusService extends EventBus<MathInputEvent> {}
