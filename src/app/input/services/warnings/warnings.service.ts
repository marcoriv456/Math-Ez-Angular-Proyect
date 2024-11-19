import {EventEmitter, Injectable} from '@angular/core';
import {InputCharData} from "../../char/char.component";
import {WarningMessageData} from "../../models/char-validation/warning-message-data.model";

@Injectable()
export class WarningsService {

  constructor() { }
  showWarning=new EventEmitter<{messages:WarningMessageData[],position:InputCharData}>()
  hideWarning=new EventEmitter<void>()
}
