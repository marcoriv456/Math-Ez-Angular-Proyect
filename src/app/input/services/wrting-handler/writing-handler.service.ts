import {inject, Injectable} from '@angular/core';
import {Term} from "../../models/terms/term.model";
import {FractionTerm} from "../../models/terms/fraction-term.model";
import {FractionAdder} from "../../classes/adders/fraction.adder";
import {ContextHandlerService} from "../context-handler/context-handler.service";
import {InputMathElement} from "../../directives/input-math-element/input-math-element.abstract";
import {CaretHandlerService} from "../caret-handler/caret-handler.service";
import {CaretIndexService} from "../caret-index/caret-index.service";
import {TermAdder} from "../../models/term.adder";
import {ExponentAdder} from "../../classes/adders/exponent-adder.helper";

@Injectable()
export class WritingHandlerService {

  private contextHandler=inject(ContextHandlerService)
  private caretHandler=inject(CaretHandlerService)
  private indexService=inject(CaretIndexService)
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
    // else if(key=='r' && ctrlKey)
    //   this.appendSimpleRoot()
    // else if(key=='r' && altKey)
    //   this.appendEditableRadicalRoot()
    // else if(key=='p' && ctrlKey)
    //   this.appendSingleChar('π')
    // else if(key=='(' || key==')')
    //   this.appendParenthesis(key)
    // else
    //   this.appendSingleChar(key)
    // this.lookForMathFunctionReferences()
  }

  private appendExponent(){
    const adder=new ExponentAdder(this.caretIndex)
    this.append(adder)
  }

  private appendFraction(){
    const adder=new FractionAdder(this.currentElement.terms,this.caretIndex)
    this.append(adder)
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
    return this.currentElement.getElement(renderedElementIndex)?.sectionAt(sectionToMoveAt)?.noCharData
  }
}
