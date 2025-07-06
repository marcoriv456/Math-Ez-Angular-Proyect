import {AfterViewInit, Component, inject} from '@angular/core';
import {bgConfig} from "./core/config/bg-config2.config";
import {GlobalEventBusService} from "../../core/services/global-event-bus/global-event-bus.service";
import {ColorSchemaChangeEvent} from "../../core/models/events/color-schema-change.event";
import {ColorSchemas} from "../../core/config/color-schemas.config";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  protected readonly bgConfig = bgConfig;
  private readonly eventBus = inject(GlobalEventBusService)

  ngAfterViewInit() {
    this.eventBus.emit(new ColorSchemaChangeEvent(ColorSchemas.DEFAULT))
  }
}
