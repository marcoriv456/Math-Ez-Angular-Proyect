import { TermRemoverInstructions } from './actions/term-remover-instructions.model';

export interface TermRemover {
  remove(): TermRemoverInstructions;
}
