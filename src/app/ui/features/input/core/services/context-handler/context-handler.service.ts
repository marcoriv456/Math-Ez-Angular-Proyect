import {inject, Injectable} from '@angular/core';
import {
  EditableTermContainerComponent
} from "../../../components/editable-term-container/editable-term-container.component";
import {InputContextManager} from "../../../classes/helpers/input-context-manager/input-context-manager.helper";
import {ContextAction} from "../../models/actions/context-action.enum";
import {InputCharData} from "../../models/input-char-data.model";
import {CaretIndexService} from "../caret-index/caret-index.service";
import {SpecialCharFinder} from "../../../classes/helpers/special-char-finder/special-char-finder.helper";

@Injectable()
export class ContextHandlerService {
  private currentElement!:EditableTermContainerComponent
  private mainElement!:EditableTermContainerComponent
  private caretIndex=inject(CaretIndexService)

  public contextElement(element:EditableTermContainerComponent){
    this.currentElement.selected=false
    this.currentElement=element
    this.currentElement.selected=true

    if(this.currentElement.mathElement)
      this.currentElement.mathElement.currentSection=element.index
  }

  public setMainElement(element:EditableTermContainerComponent){
    if(this.mainElement)
      return;
    this.mainElement=element
    this.currentElement=element
  }

  public getCurrentElement(){
    return this.currentElement
  }

  public requestForwardContextData(){
    const contextManager=this.getContextManager()

    const action=contextManager.next()

    return this.getCharDataFromAction(action)||this.currentElement.lastCharData
  }

  public requestBackwardContextData(){
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

  public get lastCharData(){
    return this.currentElement.lastCharData
  }
  public get firstCharData(){
    return this.currentElement.noCharData
  }

  public get mainContainerLastCharData(){
    return this.mainElement.lastCharData
  }

  public get mainContainerNoCharData(){
    return this.mainElement.noCharData
  }

  public get nextIrregularCharDataToMoveAt(){
    return this.currentElement.getCharData(this.charFinder.findNextIndexToMoveAt())||this.currentElement.lastCharData
  }

  public get prevIrregularCharToMoveAt(){
    return this.currentElement.getCharData(this.charFinder.findPreviousIndexToMoveAt())||this.currentElement.noCharData
  }

  private get charFinder(){
    return new SpecialCharFinder(this.caretIndex.index,this.currentElement.terms)
  }

}
