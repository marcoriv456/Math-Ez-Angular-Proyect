import {EventEmitter, Injectable} from '@angular/core';
import {InputCharData} from "../../char/char.component";

@Injectable()
export class CaretPositioningService {
  charClicked=new EventEmitter<InputCharData>
  constructor() { }

}
