import {EventEmitter, Injectable} from '@angular/core';
import {WarningMessageData} from "../../models/char-validation/warning-message-data.model";
import {InputCharData} from "../../models/input-char-data.model";

@Injectable()
export class WarningsService {

  constructor() { }
  showWarning=new EventEmitter<{messages:WarningMessageData[],position:InputCharData}>()
  hideWarning=new EventEmitter<void>()
}
