import {AfterViewInit, Component, ElementRef, HostBinding, inject, Input} from '@angular/core';

@Component({
  selector: 'calculators-topic-section',
  templateUrl: './topic-section.component.html',
  styleUrl: './topic-section.component.css'
})
export class TopicSectionComponent implements AfterViewInit {
  @Input() @HostBinding("style.--topic-color") topicColor!: string;
  @HostBinding('class.intersecting') intersecting = false;


  private readonly ref = inject(ElementRef<HTMLElement>)

  private readonly observer = new IntersectionObserver(entries => this.intersecting = entries[0].isIntersecting)

  ngAfterViewInit() {
    this.observer.observe(this.ref.nativeElement);
  }
}
