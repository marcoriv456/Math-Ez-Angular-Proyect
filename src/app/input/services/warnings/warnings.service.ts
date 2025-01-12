import {EventEmitter, Injectable} from '@angular/core';
import {InputCharData} from "../../models/input-char-data.model";
import {WarningRenderData} from "../../validation/models/term-validation-warning-render-data.model";

@Injectable()
export class WarningsService {

  constructor() { }
  showWarning=new EventEmitter<WarningRenderData>()
  hideWarning=new EventEmitter<void>()
}

