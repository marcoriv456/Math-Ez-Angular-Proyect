import {AfterViewInit, Component, ElementRef, inject, NgZone, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {BlobAnimation} from "../../core/helpers/blob-animator.helper";
import {bottomLayerConfig, topLayerConfig} from "./core/config/bg-animation.config";
import {FooterObserverService} from "../../core/services/footer/footer-observer.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnDestroy{
  @ViewChild('topicsSection') topicsSection!:ElementRef;
  @ViewChild('registerSection') registerSection!:ElementRef;

  private renderer=inject(Renderer2)
  private footerObserver=inject(FooterObserverService)
  private ngZone = inject(NgZone)

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

  ngAfterViewInit() {
    this.intersectionObserver.observe(this.topicsSection.nativeElement)
    this.intersectionObserver.observe(this.registerSection.nativeElement)
    this.observeFooter()
    this.ngZone.runOutsideAngular(() => {
      this.initAnimations()
    })
  }

  private observeFooter(){
    this.footerObserver.subscribe((value)=>{
      if(value=='enter')
        this.renderer.addClass(this.registerSection.nativeElement,'footer-intersecting')
      else
        this.renderer.removeClass(this.registerSection.nativeElement,'footer-intersecting')
    })
  }

  ngOnDestroy() {
    this.stopAnimations()
  }

  private initAnimations(){
    this.blobAnimations.push(
      new BlobAnimation('.topics .blobs .blob-2', 3, 3),
      new BlobAnimation('.topics .blobs .blob-1', 3, 3),
    )
    this.blobAnimations.forEach(animation=>animation.init({duration:2000,layerDelay:1000}))
  }

  private stopAnimations(){
    this.blobAnimations.forEach(animation=>animation.stop())
  }

  protected readonly topLayerConfig=topLayerConfig
  protected readonly bottomLayerConfig=bottomLayerConfig
}
