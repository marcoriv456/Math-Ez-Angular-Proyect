import { TermValidationMessage } from './term-validation-message.model';

export interface TermValidationData {
  isValid: boolean;
  type?: 'partially-invalid' | 'fully-invalid';
  messages: TermValidationMessage[];
}
