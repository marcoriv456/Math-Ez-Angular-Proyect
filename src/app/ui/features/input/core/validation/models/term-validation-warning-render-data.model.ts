import { TermValidationMessage } from './term-validation-message.model';

export interface TermValidationWarningRenderData {
  messages: TermValidationMessage[];
  position: { x: number; y: number };
}
