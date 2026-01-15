export class CaretVisibilityChecker {
  public scrollNeedsAdjustment = false;

  private readonly scrollBarEnd: number;

  constructor(
    private readonly overlayClientWidth: number,
    private readonly scrollBarStart: number,
  ) {
    this.scrollBarEnd = scrollBarStart + overlayClientWidth;
  }

  public makeCharVisible(positionX: number): ScrollToOptions | undefined {
    let isCharVisible =
      positionX > this.scrollBarStart && positionX < this.scrollBarEnd;
    if (isCharVisible) return;

    let isCaretOnRightSide = positionX > this.scrollBarStart;
    if (isCaretOnRightSide) {
      positionX -= this.overlayClientWidth;
      this.scrollNeedsAdjustment = true;
    }

    return { left: positionX };
  }
}
