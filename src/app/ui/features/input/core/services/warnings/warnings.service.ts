import {EventEmitter, Injectable} from '@angular/core';
import {TermValidationWarningRenderData} from "../../validation/models/term-validation-warning-render-data.model";

@Injectable()
export class WarningsService {

  constructor() { }
  showWarning=new EventEmitter<TermValidationWarningRenderData>()
  hideWarning=new EventEmitter<void>()
}

