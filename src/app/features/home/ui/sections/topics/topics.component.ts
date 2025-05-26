import {AfterViewInit, Component, ElementRef, HostBinding, inject} from '@angular/core';

@Component({
  selector: 'home-topics',
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css'
})
export class TopicsComponent implements AfterViewInit {
  @HostBinding('class.intersecting') protected isIntersecting = false
  private readonly ref: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>)


  private readonly observer = new IntersectionObserver(entries => {
    this.isIntersecting = entries[0].isIntersecting
    console.log(this.isIntersecting)
  }, {threshold: 0.5})

  ngAfterViewInit() {
    this.observer.observe(this.ref.nativeElement)
  }
}
