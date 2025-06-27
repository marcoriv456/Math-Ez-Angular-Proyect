import {AfterViewInit, Component, ElementRef, inject} from '@angular/core';
import {GlobalEventBusService} from "../../../core/services/global-event-bus/global-event-bus.service";
import {FooterIntersectedEvent} from "../../../core/models/events/footer-intersected.event";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements AfterViewInit{
  private ref=inject(ElementRef).nativeElement as HTMLElement
  private readonly eventBus = inject(GlobalEventBusService)

  private observer = new IntersectionObserver(entries => this.eventBus.emit(new FooterIntersectedEvent(entries[0].isIntersecting)))

  ngAfterViewInit() {
    this.observer.observe(this.ref)
  }

}
