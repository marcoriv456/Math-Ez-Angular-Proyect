import { TermAdderInstructions } from './actions/term-adder-instructions.model';

export interface TermAdder {
  add(): TermAdderInstructions;
}
