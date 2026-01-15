import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  inject,
} from '@angular/core';
import { GlobalEventBusService } from '../../../../../core/services/global-event-bus/global-event-bus.service';
import { FooterIntersectedEvent } from '../../../../../core/models/events/footer-intersected.event';

@Component({
  selector: 'home-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements AfterViewInit {
  @HostBinding('class.intersecting') protected isIntersecting = false;
  @HostBinding('class.footer-intersecting') protected isFooterIntersecting =
    false;

  private readonly ref = inject(ElementRef);
  private readonly eventBus = inject(GlobalEventBusService);

  private readonly observer = new IntersectionObserver(
    (entries) => (this.isIntersecting = entries[0].isIntersecting),
    { threshold: 0.65 },
  );

  ngAfterViewInit() {
    this.observer.observe(this.ref.nativeElement);
    this.eventBus
      .on(FooterIntersectedEvent)
      .subscribe((event) => (this.isFooterIntersecting = event.intersected));
  }
}
