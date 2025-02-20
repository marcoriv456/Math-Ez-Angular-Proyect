import {FractionTerm} from "./terms/fraction-term.model";

export interface FractionAdderInstructions{
  replaceFrom: number,
  replaceTo: number,
  fraction: FractionTerm
  moveTo:'numerator'|'denominator'|'outside'
}
