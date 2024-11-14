import {PowerableTerm} from "./powerable-term.model";
import {Term} from "./term.model";

export interface FractionTerm extends PowerableTerm{
  numeratorChildren:Term[]
  denominatorChildren:Term[]
  type:'fraction'
}
