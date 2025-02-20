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
    const {fraction,replaceTo,replaceFrom,moveTo}=adder.add()

    this.currentElement.replace(replaceFrom,replaceTo,fraction)

    const moveAt=this.getPlaceToMoveAtAfterAddingAFraction(replaceFrom,moveTo)
    this.caretHandler.move(moveAt)
  }

  private getPlaceToMoveAtAfterAddingAFraction(renderedElementIndex:number,moveTo:'numerator'|'denominator'|'outside'){
    this.currentElement.refresh()
    const renderedFraction=this.currentElement.getElement(renderedElementIndex) as InputMathElement<FractionTerm>
    if(moveTo=='numerator')
      return renderedFraction.firstSection.noCharData
    if(moveTo=='denominator')
      return renderedFraction.lastSection.noCharData

    return this.currentElement.getCharData(renderedFraction.index)||this.currentElement.lastCharData
  }
}
