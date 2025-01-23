import {AfterViewInit, Component, ElementRef, inject, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{
  @ViewChild('topicsSection') topicsSection!:ElementRef;

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
  }


}
