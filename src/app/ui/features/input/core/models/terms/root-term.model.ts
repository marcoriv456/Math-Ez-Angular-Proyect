import {Term} from "./term.model";

export interface RootTerm{
  radicalTerms?:Term[]
  rootChildren:Term[]
  type:'root'
}
