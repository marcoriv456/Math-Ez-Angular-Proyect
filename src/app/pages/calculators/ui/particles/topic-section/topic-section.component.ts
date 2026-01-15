import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'calculators-topic-section',
  templateUrl: './topic-section.component.html',
  styleUrl: './topic-section.component.css',
})
export class TopicSectionComponent implements AfterViewInit {
  @Input() @HostBinding('style.--topic-color') topicColor!: string;
  @ViewChildren('el') elements!: QueryList<ElementRef<HTMLElement>>;

  private readonly renderer = inject(Renderer2);

  private readonly observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) this.renderer.addClass(e.target, 'intersecting');
      }),
    { threshold: 0.2 },
  );

  ngAfterViewInit() {
    this.elements.forEach((el) => this.observer.observe(el.nativeElement));
  }
}
