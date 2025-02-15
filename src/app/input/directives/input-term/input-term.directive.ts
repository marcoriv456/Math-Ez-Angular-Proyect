import {Directive, ElementRef, HostListener, inject, Input,} from '@angular/core';
import {CharClickedNotifierService} from "../../services/char-clicked-notifier/char-clicked-notifier.service";
import {InputCharData} from "../../models/input-char-data.model";
import {InputEditableElement} from "../input-editable-element/input-editable-element.directive";

@Directive({
  selector: '[inputTerm]'
})
export class InputTermDirective {
  @Input('inputTerm')
  input!:{char:string, index:number,editableElementRef?:InputEditableElement,parent:InputEditableElement}
  ref=inject(ElementRef).nativeElement as HTMLElement
  charClickedNotifier=inject(CharClickedNotifierService)

  get data():InputCharData{
    return {
      positionX:this.rightPosition,
      index:this.index,
      parent:this.parent
    }
  }

  get rightPosition(){
    return this.leftPosition+this.ref.offsetWidth
  }

  get index(){
    return this.input.index
  }

  get parent(){
    return this.input.parent
  }

  get char(){
    return this.input.char
  }

  get asEditableElement(){
    return this.input.editableElementRef
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

  protected get absoluteLeftPosition(){
    return this.ref.getBoundingClientRect().left
  }


  @HostListener('click',['$event'])
  private onClick(event:MouseEvent){
    event.stopPropagation()
    const clickPosition=event.clientX-this.absoluteLeftPosition

    let dataToSend:InputCharData

    if(this.asEditableElement && this.asEditableElement.editable)
      dataToSend=this.asEditableElement.noCharData
    else
      dataToSend=this.getClickedCharData(clickPosition)

    this.charClickedNotifier.charClicked.emit(dataToSend)
  }

  private getClickedCharData(clickPosition:number){
    let charData=this.data

    if(this.wasClickOnLeftSide(clickPosition)){
      charData.positionX=this.leftPosition
      charData.index-=1
    }

    return charData
  }

  private wasClickOnLeftSide(clickPosition:number){
    return this.ref.offsetWidth/2>clickPosition
  }
}
