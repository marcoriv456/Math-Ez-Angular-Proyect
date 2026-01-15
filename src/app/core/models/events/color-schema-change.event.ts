import { GlobalEvent } from './base/global-event.model';
import { ColorSchema } from '../color-schema.model';

export class ColorSchemaChangeEvent implements GlobalEvent {
  constructor(public readonly newColorSchema: ColorSchema) {}
}
