import { Injectable } from '@angular/core';
import { EventBus } from '../../../../../../core/abstracts/event-bus.abstract';
import { MathInputEvent } from '../../events/math-input-event.abstract';

@Injectable()
export class MathInputEventBusService extends EventBus<MathInputEvent> { }
