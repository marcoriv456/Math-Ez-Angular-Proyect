import { interpolate, Interpolator } from 'flubber';

export class FlubberAnimation {
  constructor(...selectors: string[]) {
    let mainElement = document.querySelector(selectors[0]);
    if (!mainElement)
      throw new Error(`No main element found for selector: ${selectors[0]}`);

    this.mainElement = mainElement;

    this.elements = selectors
      .map((s) => document.querySelector(s))
      .filter((el) => el !== null);

    this.shapes = this.elements
      .map((el) => el.getAttribute('d'))
      .filter((el) => el !== null);

    this.interpolators = this.shapes.map((shape, index, shapeArr) => {
      const nextShape = shapeArr[index + 1] || shapeArr[0];
      return interpolate(shape, nextShape);
    });
  }

  private readonly mainElement: Element;

  private readonly elements: Element[];
  private readonly shapes: string[];
  private readonly interpolators: Interpolator[] = [];

  private animationFrameId = 0;
  private isStopped = false;

  public start(duration = 2000) {
    if (this.isStopped) return;

    let progress = 0;
    let interpolationIndex = 0;

    const animate = () => {
      progress += 16;
      const t = Math.min(progress / duration, 1);

      this.mainElement.setAttribute(
        'd',
        this.interpolators[interpolationIndex](t),
      );
      if (t >= 1) {
        progress = 0;
        interpolationIndex =
          (interpolationIndex + 1) % this.interpolators.length;
      }
      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  public stop() {
    this.isStopped = true;
    cancelAnimationFrame(this.animationFrameId);
  }
}
