import {ParenthesisComponent} from "../components/parenthesis/parenthesis.component";
import {Term} from "../models/terms/term.model";
import {EditableTermContainerComponent} from "../components/editable-term-container/editable-term-container.component";
import {ChangeDetectorRef} from "@angular/core";
import {InputTermDirective} from "../directives/input-term/input-term.directive";
import {FractionChildComponent} from "../components/fraction/fraction-child/fraction-child.component";
import {InputCharData} from "../models/input-char-data.model";
import {FractionComponent} from "../components/fraction/fraction.component";
import {InputEditableElement} from "../directives/input-editable-element/input-editable-element.directive";

export class TermDeleter{
  constructor(
    private currentElement:InputEditableElement,
    private termContainer:EditableTermContainerComponent,
    private cdr:ChangeDetectorRef
  ) { }

  public deleteTerms(startIndex=this.currentElement.caretIndex, deleteCount=1):InputCharData|undefined{
    if(this.isCaretInTheFirstPositionOfTheMainContainer())
      return;
    else if(this.isTermToDeleteAParenthesis(startIndex))
      return this.deleteParenthesis(startIndex)
    else if(this.isCurrentElementEmpty())
      return this.deleteCurrentElement()
    else if(this.isCaretInTheFirstPosition())
      return this.deleteCurrentElementInFirstIndex()
    else
      return this.deleteSimpleChars(startIndex,deleteCount)
  }

  private deleteParenthesis(parenthesisIndex:number){
    const parenthesisTerms:Term[]=this.currentElement.getRenderedChar(parenthesisIndex)?.asEditableElement?.terms || [],
          terms:Term[]=[{type:'char',char:'('},...parenthesisTerms]
    this.currentElement.replace(parenthesisIndex,1,terms)
    this.cdr.detectChanges()
    return this.currentElement.getCharData(parenthesisIndex+terms.length-1)||this.currentElement.lastCharData
  }

  private deleteCurrentElement(){
    if(this.isCurrentElementAFractionChild())
      return this.deleteCurrentFractionChildElement()
    let {parent,index} = this.currentElement
    if(parent && !parent.editable){
      index=parent.index
      parent=parent.parent
    }
    parent?.delete(index)
    this.cdr.detectChanges()
    return parent?.getCharData(index-1) || parent?.noCharData || this.termContainer.noCharData
  }

  private deleteCurrentFractionChildElement(){
    const currentElement=this.currentElement as FractionChildComponent,
          fractionParent=currentElement.parent as FractionComponent,
          editableParent=fractionParent.parent || this.termContainer,
          residualFractionTerms=currentElement.type=="numerator" ? fractionParent.denominatorChildren : fractionParent.numeratorChildren
    editableParent?.replace(fractionParent.index, 1,residualFractionTerms)
    this.cdr.detectChanges()
    return editableParent.getCharData(fractionParent.index+residualFractionTerms.length-1)||editableParent.noCharData
  }

  private deleteCurrentElementInFirstIndex(){
    if(this.isCurrentElementAFractionChild())
      return this.removeCurrentFractionInFirstIndex()
    let {terms,parent,index}=this.currentElement
    if(parent && !parent.editable){
      index=parent.index||0
      parent=parent.parent
    }
    parent?.replace(index,1,terms)
    this.cdr.detectChanges()
    return parent?.getCharData(index-1) || parent?.noCharData || this.termContainer.noCharData
  }

  private removeCurrentFractionInFirstIndex(){
    const currentFraction=this.currentElement.parent as FractionComponent
    const {numeratorChildren,denominatorChildren,index,parent}=currentFraction

    const isCurrentElementAFractionDenominator=(this.currentElement as FractionChildComponent).type=='denominator'

    let indexToMoveAt=index - 1;
    if (isCurrentElementAFractionDenominator)
      indexToMoveAt+=numeratorChildren.length

    parent?.replace(index,1,[...numeratorChildren,...denominatorChildren])

    this.cdr.detectChanges()
    return parent?.getCharData(indexToMoveAt)
        || parent?.noCharData
        || this.termContainer.noCharData
  }

  private deleteSimpleChars(startFrom:number,deleteCount=1){
    this.currentElement.delete(startFrom,deleteCount)
    this.cdr.detectChanges()
    return this.currentElement.getCharData(startFrom-1)
  }

  private isCaretInTheFirstPositionOfTheMainContainer(){
    return this.currentElement.caretIndex==-1&&this.currentElement==this.termContainer
  }

  private isTermToDeleteAParenthesis(index:number){
    return this.currentElement.getRenderedChar(index)?.asEditableElement instanceof ParenthesisComponent
  }

  private isCurrentElementEmpty(){
    return this.currentElement.terms.length==0
  }

  private isCaretInTheFirstPosition(){
    return this.currentElement.caretIndex==-1
  }

  private isCurrentElementAFractionChild(){
    return this.currentElement instanceof FractionChildComponent
  }

}
