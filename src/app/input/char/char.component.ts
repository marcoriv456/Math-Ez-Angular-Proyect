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

@Component({
  selector: 'char',
  templateUrl: './char.component.html',
  styleUrl: './char.component.css'
})
export class CharComponent implements AfterViewInit,OnChanges{
  @Input()
  char!:string
  @Input()
  index!:number;
  ref=inject(ElementRef).nativeElement as HTMLElement
  @Output()
  created=new EventEmitter<InputCharData>();
  @Output()
  clicked=new EventEmitter<InputCharData>






  ngAfterViewInit() {
    this.created.emit(this.data)
  }

  get data(){
    return {
      position:this.rightPosition,
      index:this.index
    }
  }

  @HostListener('click',['$event'])
  onClick({offsetX}:MouseEvent){
    let wasClickOnLeftSide=this.wasClickOnLeftSide(offsetX)
    this.clicked.emit({
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
    return this.ref.offsetLeft
  }


}
export type InputCharData={
  position:number
  index:number
}
