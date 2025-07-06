import {AfterViewInit, Component, ElementRef, HostBinding, inject} from '@angular/core';
import {GlobalEventBusService} from "../../../core/services/global-event-bus/global-event-bus.service";
import {FooterIntersectedEvent} from "../../../core/models/events/footer-intersected.event";
import {ColorSchemaChangeEvent} from "../../../core/models/events/color-schema-change.event";
import {ColorSchemas} from "../../../core/config/color-schemas.config";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  standalone: true
})
export class FooterComponent implements AfterViewInit{
  @HostBinding("style.--footer-bg") color = ColorSchemas.DEFAULT.dark3

  private ref=inject(ElementRef).nativeElement as HTMLElement
  private readonly eventBus = inject(GlobalEventBusService)

  private observer = new IntersectionObserver(entries => this.eventBus.emit(new FooterIntersectedEvent(entries[0].isIntersecting)))

  ngAfterViewInit() {
    this.observer.observe(this.ref)
    this.eventBus.on(ColorSchemaChangeEvent).subscribe(event => this.color = event.newColorSchema.dark3)
  }

}
