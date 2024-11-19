import {Term} from "./term.model";

export interface FractionTerm{
  numeratorChildren:Term[]
  denominatorChildren:Term[]
  type:'fraction'
}
