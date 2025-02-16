import {Term} from "../models/terms/term.model";

export class TermUtils {
  public static toString(terms:Term[]){
    return terms.map(t=>t.type=="char" ? t.char:'~').join('')
  }
}
