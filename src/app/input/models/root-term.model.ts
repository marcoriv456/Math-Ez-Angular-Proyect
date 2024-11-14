import {PowerableTerm} from "./powerable-term.model";
import {Term} from "./term.model";

export interface RootTerm extends PowerableTerm{
  rootChildren:Term[]
  type:'root'
}
