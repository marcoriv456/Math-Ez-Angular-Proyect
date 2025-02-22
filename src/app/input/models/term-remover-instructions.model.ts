import {Term} from "./terms/term.model";

export interface TermRemoverInstructions {
  index: number;
  count:number,
  moveTo:number,
  remainingTerms?: Term[];
}
