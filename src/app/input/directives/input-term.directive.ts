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

@Directive({
  selector: '[inputTerm]'
})
export class InputTermDirective implements OnChanges{
  @Input('inputTerm')
  input!:{char:string, index:number}

  ref=inject(ElementRef).nativeElement as HTMLElement
  caretPositioningService=inject(CaretPositioningService)

  get data(){
    return {
      position:this.rightPosition,
      index:this.index
    }
  }

  get char(){
    return this.input.char
  }
  get index(){
    return this.input.index
  }

  @HostListener('click',['$event'])
  onClick(event:MouseEvent){
    event.stopPropagation()
    let {offsetX}=event
    let wasClickOnLeftSide=this.wasClickOnLeftSide(offsetX)
    this.caretPositioningService.charClicked.emit({
      index: this.index- (wasClickOnLeftSide ? 1:0),
      position:  wasClickOnLeftSide? this.leftPosition:this.rightPosition
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
    return this.ref.getBoundingClientRect().left-this.caretPositioningService.inputRef.ref.getBoundingClientRect().left
  }

}
