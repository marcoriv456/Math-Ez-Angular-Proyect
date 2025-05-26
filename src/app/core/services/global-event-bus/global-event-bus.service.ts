import {Injectable} from '@angular/core';
import {EventBus} from "../../abstracts/event-bus.abstract";
import {GlobalEvent} from "../../models/events/base/global-event.model";

@Injectable({
  providedIn: 'root'
})
export class GlobalEventBusService extends EventBus<GlobalEvent> {
}
