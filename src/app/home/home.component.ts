import {AfterViewInit, Component, ElementRef, inject, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {BlobAnimation} from "./helpers/blob-animator.helper";
import {IParticlesProps, NgParticlesService} from "@tsparticles/angular";
import {loadSlim} from "@tsparticles/slim";
import {bgAnimationConfig} from "./config/bg-animation.config";
import {loadParallaxMover} from "@tsparticles/move-parallax";
import {Engine} from "@tsparticles/engine";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnDestroy{
  @ViewChild('topicsSection') topicsSection!:ElementRef;
  @ViewChild('registerSection') registerSection!:ElementRef;

  private renderer=inject(Renderer2)
  private observerCallback= (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        this.renderer.addClass(entry.target, 'intersecting')
        this.renderer.addClass(entry.target, 'intersected')
      }
      else
        this.renderer.removeClass(entry.target, 'intersecting');
    })
  }
  private intersectionObserver=new IntersectionObserver(this.observerCallback,{threshold:0.6})

  private blobAnimations:BlobAnimation[]=[]

  protected particlesOptions:IParticlesProps = bgAnimationConfig

  ngAfterViewInit() {
    this.intersectionObserver.observe(this.topicsSection.nativeElement)
    this.intersectionObserver.observe(this.registerSection.nativeElement)
    this.createAnimations()
  }

  ngOnDestroy() {
    this.blobAnimations.forEach(animation=>animation.stop())
  }

  private createAnimations(){
    this.blobAnimations.push(
      new BlobAnimation('.topics .blobs .blob-2',3,3),
      new BlobAnimation('.topics .blobs .blob-1',3,3),
    )
    this.initAnimations()
  }

  private initAnimations(){
    this.blobAnimations.forEach(animation=>animation.init({duration:2000,layerDelay:1000}))
  }

  private stopAnimations(){
    this.blobAnimations.forEach(animation=>animation.stop())
  }

  protected async initParticles(engine:Engine){
    await loadSlim(engine)
    await loadParallaxMover(engine)
  }
}
