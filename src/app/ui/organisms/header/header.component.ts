import {
  AfterViewInit,
  Component,
  HostBinding,
  inject,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { BlobAnimation } from '../../../core/helpers/blob-animator.helper';
import { SharedModule } from '../../shared/shared.module';
import { GlobalEventBusService } from '../../../core/services/global-event-bus/global-event-bus.service';
import { ColorSchema } from '../../../core/models/color-schema.model';
import { ColorSchemas } from '../../../core/config/color-schemas.config';
import { ColorSchemaChangeEvent } from '../../../core/models/events/color-schema-change.event';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [SharedModule, RouterLink, RouterLinkActive],
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  @HostBinding('style') schema = this.transformSchemaToCssVariables(
    ColorSchemas.DEFAULT,
  );

  private bgBlobAnimation!: BlobAnimation;

  private readonly ngZone = inject(NgZone);
  private readonly globalEventBus = inject(GlobalEventBusService);

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.bgBlobAnimation = new BlobAnimation('header .background', 3, 4);
      this.bgBlobAnimation.init({ duration: 3000, layerDelay: 500 });
    });

    this.globalEventBus.on(ColorSchemaChangeEvent).subscribe((event) => {
      this.changeColorSchema(event.newColorSchema);
    });
  }
  ngOnDestroy() {
    this.bgBlobAnimation.stop();
  }

  private changeColorSchema(schema: ColorSchema) {
    this.schema = this.transformSchemaToCssVariables(schema);
  }

  private transformSchemaToCssVariables(schema: ColorSchema) {
    return {
      '--layer-1-fill-color': schema.main,
      '--layer-2-fill-color': schema.dark1,
      '--layer-3-fill-color': schema.dark2,
      '--layer-4-fill-color': schema.dark3,
    };
  }
}
