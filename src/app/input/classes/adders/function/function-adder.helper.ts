import {Term} from "../../../models/terms/term.model";
import {TermAdder} from "../../../models/term.adder";
import {TermAdderInstructions} from "../../../models/term-adder-instructions.model";
import {TermUtils} from "../../term-utils";

export class FunctionAdder implements TermAdder{
  constructor(private terms:Term[], recognizableFunctions:string[]) {
      const regexpString=`${recognizableFunctions.join('|')}`
      this.functionsRegexp =  new RegExp(regexpString,'gd');

      this.termsString=TermUtils.toString(terms)
  }

  private readonly termsString:string
  private readonly functionsRegexp:RegExp
  private from!:number
  private to!:number
  private foundFunctionName!:string
  private functionArgumentTerms?:Term[]
  private moveTo:number|'outside'=0

  add(): TermAdderInstructions {
    this.lookForFunctionCoincidence()
    this.checkParenthesisAutofillAvailability()
    return {
      replaceFrom:this.from,
      replaceCount:this.to-this.from + 1,
      term:this.generateFunctionTerm(),
      containerToMoveAt:this.moveTo
    }
  }

  private lookForFunctionCoincidence(){
    let coincidence=this.functionsRegexp.exec(this.termsString)
    if(!coincidence || !coincidence.indices)
        throw new Error("Didn't found any function")

    this.from=coincidence.indices[0][0]
    this.to=coincidence.indices[0][1]-1
    this.foundFunctionName=coincidence[0]
  }

  private checkParenthesisAutofillAvailability(){
    const nextTerm= this.terms[this.to+1]
    if(!nextTerm || nextTerm.type!=='parenthesis')
      return;

    this.to++
    this.functionArgumentTerms=nextTerm.parenthesisChildren
    this.moveTo=this.functionBase ? 0:'outside'
  }

  private get functionBase(){
    return this.foundFunctionName == 'log' ? []:undefined
  }

  private generateFunctionTerm():Term{
    return{
      type:"function",
      functionName:this.foundFunctionName,
      functionChildren:this.functionArgumentTerms||[],
      argumentTerms:this.functionBase
    }
  }
}
