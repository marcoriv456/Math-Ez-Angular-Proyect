import { Term } from './term.model';

export interface ParenthesisTerm {
  parenthesisChildren: Term[];
  type: 'parenthesis';
}
