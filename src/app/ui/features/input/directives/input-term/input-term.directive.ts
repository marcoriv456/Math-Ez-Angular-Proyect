import {Directive, ElementRef, Host, HostListener, inject, Input, Optional, SkipSelf,} from '@angular/core';
import {CharClickedNotifierService} from "../../core/services/char-clicked-notifier/char-clicked-notifier.service";
import {InputCharData} from "../../core/models/input-char-data.model";
import {InputMathElement} from "../input-math-element/input-math-element.abstract";
import {
  EditableTermContainerComponent
} from "../../components/editable-term-container/editable-term-container.component";

@Directive({
  selector: '[inputTerm]'
})
export class InputTermDirective {
  @Input() index!:number

  constructor(
    @Host() @Optional() public asMathElement:InputMathElement<any>|null,
    @SkipSelf() public parent:EditableTermContainerComponent
  ) { }

  private ref=inject(ElementRef).nativeElement as HTMLElement
  private charClickedNotifier=inject(CharClickedNotifierService)

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

  get leftPosition(){
    let parent:HTMLElement|null=this.ref.parentElement
    let leftPosition=this.ref.offsetLeft
    while(parent && !(parent.tagName=='APP-INPUT')){
      leftPosition+=parent.offsetLeft||0
      parent=parent.parentElement
    }
    return leftPosition
  }

  @HostListener('click',['$event'])
  private onClick(event:MouseEvent){
    event.stopPropagation()
    const clickPosition=event.offsetX
    const dataToSend=this.getClickedCharData(clickPosition)

    this.charClickedNotifier.notifyClick(dataToSend)
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
