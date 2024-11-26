import {Term} from "./term.model";

export interface FunctionTerm{
  functionName:string
  functionChildren:Term[]
  argumentTerms?:Term[]
  type:'function'
}
