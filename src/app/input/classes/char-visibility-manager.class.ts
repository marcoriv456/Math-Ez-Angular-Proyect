import {ElementRef} from "@angular/core";

export class CharVisibilityManager {
  private readonly overlayViewWidth:number;
  private readonly scrollBarFrom:number;
  private readonly scrollBarTo:number;
  constructor(private overlay:HTMLElement) {
    this.overlayViewWidth=overlay.clientWidth
    this.scrollBarFrom=overlay.scrollLeft
    this.scrollBarTo=this.scrollBarFrom+this.overlayViewWidth
  }



  public makeCharVisible(positionX:number){
    let isCharVisible=positionX > this.scrollBarFrom && positionX < this.scrollBarTo

    if(!isCharVisible){
      let isCaretOnRightSide=positionX > this.scrollBarFrom

      this.overlay.scrollTo({
        left : isCaretOnRightSide ? positionX-this.overlayViewWidth : positionX
      })
    }
  }
}
