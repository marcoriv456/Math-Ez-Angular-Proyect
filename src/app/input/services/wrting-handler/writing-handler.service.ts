import {inject, Injectable} from '@angular/core';
import {FractionAdder} from "../../classes/adders/fraction/fraction-adder.helper";
import {ContextHandlerService} from "../context-handler/context-handler.service";
import {CaretHandlerService} from "../caret-handler/caret-handler.service";
import {CaretIndexService} from "../caret-index/caret-index.service";
import {TermAdder} from "../../models/term.adder";
import {ExponentAdder} from "../../classes/adders/exponent-adder.helper";
import {RootAdder} from "../../classes/adders/root-adder.class";
import {IndexedRootAdder} from "../../classes/adders/indexed-root-adder.helper";
import {ParenthesisAdder} from "../../classes/adders/parenthesis/parenthesis-adder.helper";
import {RecognizableFunctionsService} from "../recognizable-functions/recognizable-functions.service";
import {FunctionAdder} from "../../classes/adders/function/function-adder.helper";

@Injectable()
export class WritingHandlerService {
  private contextHandler=inject(ContextHandlerService)
  private caretHandler=inject(CaretHandlerService)
  private indexService=inject(CaretIndexService)
  private functionsService=inject(RecognizableFunctionsService)

  private get currentElement(){
    return this.contextHandler.getCurrentElement()
  }
  private get caretIndex(){
    return this.indexService.index
  }


  public handleKey(key:string, ctrlKey:boolean,altKey:boolean){
    console.log(key)
    if(key=='/')
      this.appendFraction()
    else if(key=='e' && ctrlKey)
      this.appendExponent()
    else if(key=='r' && ctrlKey)
      this.appendRoot()
    else if(key=='r' && altKey)
      this.appendIndexedRoot()
    else if(key=='p' && ctrlKey)
      this.appendChar('π')
    else if(key=='(' || key==')')
      this.appendParenthesis(key)
    else
      this.appendChar(key)
  }
  private appendChar(char:string){
    this.currentElement.append(this.caretIndex+1,{type:'char',char})
    this.currentElement.refresh()
    this.caretHandler.move(this.currentElement.getCharData(this.caretIndex+1)||this.currentElement.noCharData)
    this.lookForMathFunctionReferences()
  }

  private appendParenthesis(parenthesis:'('|')'){
    const adder=new ParenthesisAdder(this.caretIndex, this.currentElement.terms,parenthesis)
    try{
      this.append(adder)
    }catch (matchingParenthesisNotFound){
      this.appendChar(parenthesis)
    }
  }

  private appendIndexedRoot(){
    const adder=new IndexedRootAdder(this.caretIndex)
    this.append(adder)
  }

  private appendRoot(){
    const adder=new RootAdder(this.caretIndex)
    this.append(adder)
  }

  private appendExponent(){
    const adder=new ExponentAdder(this.caretIndex)
    this.append(adder)
  }

  private appendFraction(){
    const adder=new FractionAdder(this.currentElement.terms,this.caretIndex)
    this.append(adder)
  }

  private lookForMathFunctionReferences(){
    const adder=new FunctionAdder(this.currentElement.terms,this.functionsService.recognizableFunctions)
    try{
      this.append(adder)
    }catch (error){}
  }


  private append(adder:TermAdder){
    const {term,replaceFrom,replaceCount,containerToMoveAt}=adder.add()
    this.currentElement.replace(replaceFrom,replaceCount,term)

    const moveAt=this.getPlaceToMoveAtAfterAddingATerm(replaceFrom,containerToMoveAt)
    this.caretHandler.move(moveAt||this.currentElement.lastCharData)
  }

  private getPlaceToMoveAtAfterAddingATerm(renderedElementIndex:number,sectionToMoveAt:number|'outside'){
    this.currentElement.refresh()
    if(sectionToMoveAt=='outside')
      return this.currentElement.getCharData(renderedElementIndex)
    return this.currentElement.getElement(renderedElementIndex)?.sectionAt(sectionToMoveAt)?.lastCharData
  }
}
