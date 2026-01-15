import { MathInputEvent } from '../base/input-event.model';
import { TermValidationWarningRenderData } from '../../../validation/models/term-validation-warning-render-data.model';

export class WarningShowRequestEvent implements MathInputEvent {
  constructor(public readonly renderData: TermValidationWarningRenderData) {}
}
