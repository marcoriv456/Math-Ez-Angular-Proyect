import {Term} from "./terms/term.model";

export interface TermAdderInstructions {
  replaceFrom: number,
  replaceCount: number,
  term: Term
  containerToMoveAt:number|'outside'
}
