import {inject, Injectable} from '@angular/core';
import {
  EditableTermContainerComponent
} from "../../../ui/molecules/editable-term-container/editable-term-container.component";
import {InputContextManager} from "../../helpers/input-context-manager/input-context-manager.helper";
import {ContextAction} from "../../models/actions/context-action.enum";
import {InputCharData} from "../../models/input-char-data.model";
import {CaretIndexService} from "../caret-index/caret-index.service";
import {SpecialCharFinder} from "../../helpers/special-char-finder/special-char-finder.helper";

@Injectable()
export class ContextHandlerService {
  private currentElement!:EditableTermContainerComponent
  private caretIndex=inject(CaretIndexService)

  public contextElement(element:EditableTermContainerComponent){
    if(this.currentElement)
      this.currentElement.selected=false
    this.currentElement=element
    this.currentElement.selected=true

    if(this.currentElement.mathElement)
      this.currentElement.mathElement.currentSection=element.index
  }

  public getCurrentElement(){
    return this.currentElement
  }

  public getForwardContextData(){
    const contextManager=this.getContextManager()

    const action=contextManager.next()

    return this.getCharDataFromAction(action)||this.currentElement.lastCharData
  }

  public getBackwardContextData(){
    const contextManager=this.getContextManager()

    const action=contextManager.prev()

    return this.getCharDataFromAction(action)||this.currentElement.noCharData
  }

  private getContextManager(){
    return new InputContextManager(this.currentElement.getTermLocation(this.caretIndex.index))
  }

  private getCharDataFromAction(action:ContextAction):InputCharData|undefined{
    switch (action){
      case ContextAction.MoveToNextChar:
        return this.currentElement.getCharData(this.caretIndex.index+1)
      case ContextAction.MoveToPrevChar:
        return this.currentElement.getCharData(this.caretIndex.index-1)
      case ContextAction.MoveToFirstChar:
        return this.currentElement.noCharData
      case ContextAction.MoveToLastChar:
        return this.currentElement.lastCharData
      case ContextAction.ContextActualTerm:
        return this.currentElement.getElement(this.caretIndex.index)?.lastSection.lastCharData
      case ContextAction.ContextNextTerm:
        return this.currentElement.getElement(this.caretIndex.index+1)?.firstSection.noCharData
      case ContextAction.ContextNextContainer:
        return this.currentElement.mathElement.nextSection?.noCharData
      case ContextAction.ContextPrevContainer:
        return this.currentElement.mathElement.previousSection?.lastCharData
      case ContextAction.ContextOutByRight:
        return this.currentElement.mathElement.parent.getCharData(this.currentElement.mathElement.index)||this.currentElement.mathElement.parent.lastCharData
      case ContextAction.ContextOutByLeft:
        return this.currentElement.mathElement.parent.getCharData(this.currentElement.mathElement.index-1)||this.currentElement.mathElement.parent.noCharData
    }
  }

  public getLastCharData(){
    return this.currentElement.lastCharData
  }

  public getFirstCharData(){
    return this.currentElement.noCharData
  }

  public getMainContainerLastCharData(){
    return this.getMainElement().lastCharData
  }

  public getMainContainerNoCharData(){
    return this.getMainElement().noCharData
  }

  public getNextIrregularCharDataToMoveAt(){
    return this.currentElement.getCharData(this.getCharFinder().findNextIndexToMoveAt())||this.currentElement.lastCharData
  }

  public getPrevIrregularCharToMoveAt(){
    return this.currentElement.getCharData(this.getCharFinder().findPreviousIndexToMoveAt())||this.currentElement.noCharData
  }

  private getCharFinder(){
    return new SpecialCharFinder(this.caretIndex.index,this.currentElement.terms)
  }

  private getMainElement() {
    let element = this.currentElement

    while(element.mathElement)
      element = element.mathElement.parent

    return element
  }

}
