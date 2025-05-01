import {FlubberAnimation} from "./flubber-animation.helper";

export class BlobAnimation {
  private flubberAnimations: FlubberAnimation[] = []

  constructor(private blobSelector: string, private steps: number, private layers: number) {
    this.flubberAnimations = this.generateFlubberAnimations()
  }

  public init({duration, layerDelay}: { duration: number, layerDelay?: number }) {
    this.flubberAnimations.forEach((animation, index) => animation.start(duration + ((layerDelay || 0) * index)))
  }

  public stop() {
    this.flubberAnimations.forEach(animation => animation.stop())
  }

  private generateFlubberAnimations() {
    return this.selectors.map(selectorArr => new FlubberAnimation(...selectorArr))
  }

  private get selectors(): string[][] {
    let selectors: string[][] = []

    for (let layer = 1; layer <= this.layers; layer++)
      selectors.push(this.stepSelectors.map(s => `${this.blobSelector} .layer-${layer} ${s}`))

    return selectors
  }

  private get stepSelectors() {
    let selectors: string[] = []

    for (let step = 1; step <= this.steps; step++)
      selectors.push(`.step-${step}`)

    return selectors
  }


}
