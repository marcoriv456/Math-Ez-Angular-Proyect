import {AfterViewInit, ChangeDetectorRef, Component, inject, QueryList, ViewChildren} from '@angular/core';
import {BlobComponent} from "../../ui/shared/atoms/blob/blob.component";
import {GlobalEventBusService} from "../../core/services/global-event-bus/global-event-bus.service";
import {ColorSchemaChangeEvent} from "../../core/models/events/color-schema-change.event";
import {ColorSchema} from "../../core/models/color-schema.model";
import {ColorSchemas} from "../../core/config/color-schemas.config";

@Component({
  selector: 'app-calculators',
  templateUrl: './calculators.component.html',
  styleUrl: './calculators.component.css'
})
export class CalculatorsComponent implements AfterViewInit {
  @ViewChildren(BlobComponent) blobs!: QueryList<BlobComponent>;

  private readonly globalEventBus = inject(GlobalEventBusService)
  private readonly cdr = inject(ChangeDetectorRef)

  ngAfterViewInit() {
    this.blobs.forEach(blob => {
      blob.changeColors(ColorSchemas.ALTERNATE)
      blob.show()
    })
    this.cdr.detectChanges();
    this.globalEventBus.emit(new ColorSchemaChangeEvent(ColorSchemas.ALTERNATE))
  }

  protected changeBlobsColors(schema: ColorSchema) {
    this.blobs.forEach(blob => blob.changeColors(schema))
  }

  protected showBlobs() {
    this.blobs.forEach(blob => blob.show())
  }

  protected showLeftBlob() {
    this.hideBlobs()
    this.blobs.get(0)?.show()
  }

  protected showRightBlob() {
    this.hideBlobs()
    this.blobs.get(1)?.show()
  }

  protected hideBlobs() {
    this.blobs.forEach(blob => blob.hide())
  }

}
