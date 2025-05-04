import {MathInputEvent} from "../base/input-event.model";

export class KeyTypedEvent implements MathInputEvent{
  constructor(public key:string, public ctrlKey:boolean, public altKey:boolean) { }
}
