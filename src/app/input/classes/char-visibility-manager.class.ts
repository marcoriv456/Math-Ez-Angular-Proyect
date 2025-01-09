import {ElementRef} from "@angular/core";

export class CharVisibilityManager {
  private readonly overlayViewWidth:number;
  private readonly scrollBarFrom:number;
  private readonly scrollBarTo:number;
  private readonly offset=3
  constructor(private overlay:HTMLElement) {
    this.overlayViewWidth=overlay.clientWidth
    this.scrollBarFrom=overlay.scrollLeft
    this.scrollBarTo=this.scrollBarFrom+this.overlayViewWidth
  }



  public makeCharVisible(positionX:number){
    let isCharVisible=positionX > this.scrollBarFrom && positionX < this.scrollBarTo
    if(isCharVisible)
      return;

    let isCaretOnRightSide=positionX > this.scrollBarFrom
    if(isCaretOnRightSide)
      positionX-=this.overlayViewWidth

    this.overlay.scrollTo({left: positionX})

    if(isCaretOnRightSide)
      setTimeout(()=>this.overlay.scrollBy({left: this.offset}),100)
    }

}
