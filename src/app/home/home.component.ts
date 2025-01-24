import {AfterViewInit, Component, ElementRef, inject, Renderer2, ViewChild} from '@angular/core';
import {BlobAnimation} from "./helpers/blob-animator.helper";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{
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
  private intersectionObserver=new IntersectionObserver(this.observerCallback,{threshold:0.7})

  ngAfterViewInit() {
    this.intersectionObserver.observe(this.topicsSection.nativeElement)
    this.intersectionObserver.observe(this.registerSection.nativeElement)

    let blob2Animation=new BlobAnimation('.topics .blobs .blob-2',3,3)
    let blob1Animation=new BlobAnimation('.topics .blobs .blob-1',3,3)
    blob1Animation.init({duration:2000,layerDelay:500})
    blob2Animation.init({duration:2000,layerDelay:500})
  }

}
