import {PowerableTerm} from "./powerable-term.model";

export interface CharTerm extends PowerableTerm{
  char:string
  type:'char'
}
