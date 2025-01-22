import {AfterViewInit, Component, ElementRef, inject, OnDestroy} from '@angular/core';
import {interpolate} from "flubber";
import {FlubberAnimation} from "./helpers/flubber-animation.helper";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl:'./header.component.css'
})
export class HeaderComponent implements AfterViewInit,OnDestroy{
  private flubberAnimations:FlubberAnimation[]=[]
  private flubberAnimationDuration=2000

  private addFlubberAnimation(layer:number){
    let animation=new FlubberAnimation(`.step-1 .layer-${layer}`, `.step-2 .layer-${layer}`, `.step-3 .layer-${layer}`)
    this.flubberAnimations.push(animation)
    animation.start(this.flubberAnimationDuration)
  }

  ngAfterViewInit() {
    for (let i=1; i<=4; i++)
      this.addFlubberAnimation(i)
  }
  ngOnDestroy() {
    this.flubberAnimations.forEach(a=>a.stop())
  }
}
