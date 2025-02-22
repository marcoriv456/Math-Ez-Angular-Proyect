import {Term} from "../models/terms/term.model";
import {TermAdderInstructions} from "../models/term-adder-instructions.model";
import {TermRemoverInstructions} from "../models/term-remover-instructions.model";

export class TermUtils {
  public static toString(terms:Term[]){
    return terms.map(t=>t.type=="char" ? t.char:'~').join('')
  }

  public static parse(phrase:string):Term[]{
    return [...phrase].map(char=>({type:'char',char}))
  }

  public static performAdderInstructions(terms:Term[], {replaceFrom,replaceCount,term}:TermAdderInstructions){
    terms.splice(replaceFrom,replaceCount,term)
  }

  public static performRemoverInstructions(terms:Term[], {index,count,remainingTerms}:TermRemoverInstructions){
    terms.splice(index,count,...remainingTerms||[])
  }
}
