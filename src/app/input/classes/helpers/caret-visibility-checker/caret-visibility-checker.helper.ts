export class CaretVisibilityChecker {
  public scrollNeedsAdjustment=true

  private readonly scrollBarEnd:number

  constructor(
    private readonly overlayClientWidth:number,
    private readonly scrollBarStar:number,
) {
    this.scrollBarEnd=scrollBarStar+overlayClientWidth
  }

  public makeCharVisible(positionX:number):ScrollToOptions|undefined{
    let isCharVisible=positionX > this.scrollBarStar && positionX < this.scrollBarEnd
    if(isCharVisible)
      return;

    let isCaretOnRightSide=positionX > this.scrollBarStar
    if(isCaretOnRightSide){
      positionX-=this.overlayClientWidth
      this.scrollNeedsAdjustment=true
    }

    return {left: positionX}
    }

}
