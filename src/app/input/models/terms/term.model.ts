import {CharTerm} from "./char-term.model";
import {FractionTerm} from "./fraction-term.model";
import {RootTerm} from "./root-term.model";
import {ExponentTerm} from "./exponent-term";
import {FunctionTerm} from "./function-term.model";

export type Term=CharTerm|FractionTerm|RootTerm|ExponentTerm|FunctionTerm
