export class DomPositionCalculator {
  public static PositionX(child: HTMLElement, expectedParentTag: string) {
    let parent: HTMLElement | null = child.parentElement;
    let positionX = child.offsetLeft;
    while (parent && parent.tagName != expectedParentTag) {
      positionX += parent.offsetLeft;
      parent = parent.parentElement;
    }
    return positionX;
  }
}
