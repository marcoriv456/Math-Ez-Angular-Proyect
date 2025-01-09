import {InputEditableElement} from "./input-editable-element.class";
import {EditableTermContainerComponent} from "../components/editable-term-container/editable-term-container.component";
import {InputTermDirective} from "../directives/input-term.directive";

export class InputContextManager{
  constructor(
    private currentElement:InputEditableElement,
    private termContainer:EditableTermContainerComponent
  ) {
  }

  public getNextElementData() {
    let nextElement = this.currentElement.terms[this.nextIndex],
      isNextElementChar = nextElement && nextElement.type == 'char',
      isCaretInTheLastPosition = !nextElement && this.currentElement == this.termContainer
    if (isNextElementChar || isCaretInTheLastPosition)
      return this.nextRenderedElementData
    else
      return this.getForwardContextData()
  }

  public getPrevElementData() {
    let prevElement = this.currentElement.terms[this.currentElement.caretIndex],
      isPrevElementChar = prevElement && prevElement.type == 'char',
      isCaretInFirstChar = !prevElement && this.currentElement.caretIndex == 0,
      isCaretInTheFirstPosition = !prevElement && this.currentElement == this.termContainer
    if (isPrevElementChar || isCaretInTheFirstPosition || isCaretInFirstChar)
      return this.prevRenderedElementData
    else
      return this.getBackwardsContextData()
  }

  public getActualParentContextData(){
    return this.getParentContextData('forwards')
  }

  private getForwardContextData() {
    let nextRenderedElement = this.nextRenderedElement,
      parent=this.currentElement.parent,
      isCaretInTheLastPosition=this.currentElement.caretIndex==this.currentElement.lastCharData.index
    if(parent && !parent.editable  && isCaretInTheLastPosition)
      nextRenderedElement=this.nextRenderedElementInParent
    let nextEditableElement = nextRenderedElement?.asEditableElement
    if (!nextRenderedElement || !nextEditableElement)
      return this.getParentContextData("forwards")
    else
      return this.getNextRenderedElementContextData(nextRenderedElement)
  }

  private getNextRenderedElementContextData(nextRenderedElement: InputTermDirective) {
    let nextEditableEl=nextRenderedElement.asEditableElement
    if(nextEditableEl && !nextEditableEl.editable)
      nextEditableEl=nextEditableEl.renderedChars.get(0)?.asEditableElement
    return (nextEditableEl || this.termContainer).noCharData
  }

  private getBackwardsContextData() {
    let actualRenderedElement = this.actualRenderedElement,
      parent=this.currentElement.parent,
      isCaretInTheFirstPosition=this.currentElement.caretIndex==-1,
      parentHasMoreThanOneChild=parent && parent.renderedChars.length > 1
    if(parent && !parent.editable && isCaretInTheFirstPosition && parentHasMoreThanOneChild)
      actualRenderedElement=this.prevRenderedElementInParent
    if (!actualRenderedElement || !actualRenderedElement.asEditableElement)
      return this.getParentContextData('backwards')
    else
      return this.getPrevRenderedElementContextData(actualRenderedElement)
  }

  private getPrevRenderedElementContextData(prevRenderedElement:InputTermDirective){
    let prevEditableEl=prevRenderedElement.asEditableElement
    if(prevEditableEl&&!prevEditableEl.editable)
      prevEditableEl=prevEditableEl.renderedChars.get(prevEditableEl.lastCharData.index)?.asEditableElement

    return (prevEditableEl || this.termContainer).lastCharData
  }

  private getParentContextData(option:'forwards'|'backwards'){
    let prevCurrentElementIndex=this.currentElement.index,
      actualParent=this.currentElement.parent
    if(actualParent && !actualParent.editable){
      prevCurrentElementIndex=actualParent.index
      actualParent=actualParent.parent
    }
    const contextChangeData=actualParent?.getCharData(prevCurrentElementIndex - (option=='forwards' ? 0:1))  || actualParent?.noCharData,
      defaultContextChangeData=option == 'forwards' ? this.termContainer.lastCharData:this.termContainer.noCharData
    return contextChangeData || defaultContextChangeData
  }

  private get nextRenderedElement(){
    return this.getRenderedElement(this.caretIndex+1)
  }

  private get actualRenderedElement(){
    return this.getRenderedElement(this.caretIndex)
  }

  private get prevRenderedElement(){
    return this.getRenderedElement(this.caretIndex-1)
  }

  private get nextRenderedElementData(){
    return this.nextRenderedElement?.data || this.currentElement.lastCharData
  }

  private get prevRenderedElementData(){
    return this.prevRenderedElement?.data || this.currentElement.noCharData
  }

  private get nextIndex(){
    return this.caretIndex + 1
  }

  private get caretIndex(){
    return this.currentElement.caretIndex
  }

  private getRenderedElement(index:number){
    return this.currentElement.getRenderedChar(index)
  }

  private get nextRenderedElementInParent() {
    return this.getRenderedElementInParentAt(this.currentElement.index + 1)
  }

  private get prevRenderedElementInParent(){
    return this.getRenderedElementInParentAt(this.currentElement.index-1)
  }

  private getRenderedElementInParentAt(index:number){
    return this.currentElement.parent?.renderedChars.get(index)
  }
}
