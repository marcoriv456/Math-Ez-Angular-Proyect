import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {CaretPositioningService} from "../services/caret-positioning/caret-positioning.service";
import {InputEditableElement} from "../classes/input-editable-element";
import {InputCharData} from "../char/char.component";

@Directive({
  selector: '[inputTerm]'
})
export class InputTermDirective implements OnChanges{
  @Input('inputTerm')
  input!:{char:string, index:number,classRef?:InputEditableElement}

  ref=inject(ElementRef).nativeElement as HTMLElement
  caretPositioningService=inject(CaretPositioningService)



  get data():InputCharData{
    return {
      positionX:this.rightPosition,
      positionY:this.topPosition,
      index:this.index,
      size:this.ref.offsetHeight
    }
  }

  get char(){
    return this.input.char
  }
  get index(){
    return this.input.index
  }
  get classRef(){
    return this.input.classRef
  }

  @HostListener('click',['$event'])
  onClick(event:MouseEvent){
    event.stopPropagation()
    let {offsetX}=event
    let wasClickOnLeftSide=this.wasClickOnLeftSide(offsetX)
    this.caretPositioningService.charClicked.emit({
      positionX:  wasClickOnLeftSide? this.leftPosition:this.rightPosition,
      positionY:this.topPosition,
      index: this.index- (wasClickOnLeftSide ? 1:0),
      size:this.size
    })
  }

  private wasClickOnLeftSide(clickOffset:number){
    return this.ref.offsetWidth/2>clickOffset
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }



  private get rightPosition(){
    return this.leftPosition+this.ref.offsetWidth
  }
  private get leftPosition(){
    return this.ref.getBoundingClientRect().left-this.caretPositioningService.inputPositionX
  }
  private get topPosition(){
    return this.ref.getBoundingClientRect().top-this.caretPositioningService.inputPositionY
  }
  private get size(){
    return this.ref.offsetHeight
  }

}
