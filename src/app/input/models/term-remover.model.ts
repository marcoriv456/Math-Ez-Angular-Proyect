import {TermRemoverInstructions} from "./term-remover-instructions.model";

export interface TermRemover{
  remove():TermRemoverInstructions
}
