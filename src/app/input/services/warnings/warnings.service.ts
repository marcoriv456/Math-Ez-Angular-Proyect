import {EventEmitter, Injectable} from '@angular/core';
import {WarningMessageData} from "../../models/char-validation/warning-message-data.model";
import {InputCharData} from "../../models/input-char-data.model";
import {WarningRenderData} from "../../models/char-validation/warning-render-data.model";

@Injectable()
export class WarningsService {

  constructor() { }
  showWarning=new EventEmitter<WarningRenderData>()
  hideWarning=new EventEmitter<void>()
}

