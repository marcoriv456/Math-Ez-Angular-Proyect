import {MathInputEvent} from "../base/input-event.model";
import {InputCharData} from "../../input-char-data.model";

export class CaretMoveRequestEvent implements MathInputEvent{
  constructor(public charData:InputCharData) {
  }
}
