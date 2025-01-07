import {
  Directive,
  ElementRef,
  HostListener,
  inject, Input,
} from '@angular/core';
import {InputUtilitiesService} from "../services/caret-positioning/input-utilities.service";
import {InputEditableElement} from "../classes/input-editable-element.class";
import {InputCharData} from "../models/input-char-data.model";

@Directive({
  selector: '[inputTerm]'
})
export class InputTermDirective{
  @Input('inputTerm')
  input!:{char:string, index:number,editableElementRef?:InputEditableElement,parent:InputEditableElement}
  ref=inject(ElementRef).nativeElement as HTMLElement
  inputUtilitiesService=inject(InputUtilitiesService)

  get data():InputCharData{
    return {
      positionX:this.rightPosition,
      positionY:this.topPosition,
      index:this.index,
      size:this.size,
      parent:this.parent
    }
  }

  get char(){
    return this.input.char
  }
  get index(){
    return this.input.index
  }
  get asEditableElement(){
    return this.input.editableElementRef
  }
  get parent(){
    return this.input.parent
  }

  @HostListener('click',['$event'])
  onClick(event:MouseEvent){
    event.stopPropagation()
    let {offsetX}=event
    let wasClickOnLeftSide=this.wasClickOnLeftSide(offsetX)
    let dataToSend=this.data
    if(wasClickOnLeftSide){
      dataToSend.positionX=this.leftPosition
      dataToSend.index-=1
    }
    dataToSend.parent=this.parent
    this.inputUtilitiesService.charClicked.emit(dataToSend)
  }

  private wasClickOnLeftSide(clickOffset:number){
    return this.ref.offsetWidth/2>clickOffset
  }

  private get rightPosition(){
    return this.leftPosition+this.ref.offsetWidth
  }
  get leftPosition(){
    let parent:HTMLElement|null=this.ref.parentElement
    let leftPosition=this.ref.offsetLeft
    while(parent && !(parent.tagName=='APP-INPUT')){
      leftPosition+=parent.offsetLeft||0
      parent=parent.parentElement
    }
    return leftPosition
  }
  private get topPosition(){
    return this.ref.getBoundingClientRect().top-this.inputUtilitiesService.inputPositionY
  }
  private get size(){
    return this.ref.offsetHeight
  }
}
