import {inject, Injectable} from '@angular/core';
import {Term} from "../../models/terms/term.model";
import {FractionTerm} from "../../models/terms/fraction-term.model";
import {FractionAdder} from "../../classes/adders/fraction-adder";
import {ContextHandlerService} from "../context-handler/context-handler.service";
import {InputMathElement} from "../../directives/input-math-element/input-math-element.abstract";
import {CaretHandlerService} from "../caret-handler/caret-handler.service";
import {CaretIndexService} from "../caret-index/caret-index.service";

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
    // else if(key=='e' && ctrlKey)
    //   this.appendExponent()
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

  public appendFraction(){
    const adder=new FractionAdder(this.currentElement.terms,this.caretIndex)
    const {term,replaceCount,replaceFrom,containerToMoveAt}=adder.add()
    console.log(adder.add())

    this.currentElement.replace(replaceFrom,replaceCount,term)

    const moveAt=this.getPlaceToMoveAtAfterAddingAFraction(replaceFrom,containerToMoveAt)
    this.caretHandler.move(moveAt||this.currentElement.lastCharData)
  }

  private getPlaceToMoveAtAfterAddingAFraction(renderedElementIndex:number,sectionToMoveAt:number|'outside'){
    this.currentElement.refresh()
    if(sectionToMoveAt=='outside')
      return this.currentElement.getCharData(renderedElementIndex)
    return this.currentElement.getElement(renderedElementIndex)?.sectionAt(sectionToMoveAt)?.noCharData
  }
}
