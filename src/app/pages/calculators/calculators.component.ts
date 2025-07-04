import {AfterViewInit, Component, inject, QueryList, ViewChildren} from '@angular/core';
import {BlobComponent} from "../../ui/shared/atoms/blob/blob.component";
import {GlobalEventBusService} from "../../core/services/global-event-bus/global-event-bus.service";
import {ColorSchemaChangeEvent} from "../../core/models/events/color-schema-change.event";
import {ColorSchemas} from "../../core/config/color-schemas.config";

@Component({
  selector: 'app-calculators',
  templateUrl: './calculators.component.html',
  styleUrl: './calculators.component.css'
})
export class CalculatorsComponent implements AfterViewInit {
  @ViewChildren(BlobComponent) blobs!: QueryList<BlobComponent>;

  private readonly globalEventBus = inject(GlobalEventBusService)

  ngAfterViewInit() {
    this.blobs.forEach(blob => blob.show())
    this.globalEventBus.emit(new ColorSchemaChangeEvent(ColorSchemas.ALTERNATE))
  }

}
