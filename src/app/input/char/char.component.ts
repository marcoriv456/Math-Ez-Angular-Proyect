import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, HostBinding, HostListener,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {CaretPositioningService} from "../services/caret-positioning/caret-positioning.service";

@Component({
  selector: 'char',
  templateUrl: './char.component.html',
  styleUrl: './char.component.css'
})
export class CharComponent implements OnChanges{
  @Input()
  char!:string
  @Input()
  index!:number;
  ref=inject(ElementRef).nativeElement as HTMLElement
  caretPositioningService=inject(CaretPositioningService)





  // ngAfterViewInit() {
  //   this.created.emit(this.data)
  //   console.log("emiting from: ",this.ref)
  // }

  get data(){
    return {
      position:this.rightPosition,
      index:this.index
    }
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
export type InputCharData={
  position:number
  index:number
}
