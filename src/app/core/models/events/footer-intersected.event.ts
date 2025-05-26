import {GlobalEvent} from "./base/global-event.model";

export class FooterIntersectedEvent implements GlobalEvent {
  constructor(public intersected: boolean) {
  }
}

