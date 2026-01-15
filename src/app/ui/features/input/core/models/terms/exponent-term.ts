import { Term } from './term.model';

export interface ExponentTerm {
  exponentChildren: Term[];
  type: 'exponent';
}
