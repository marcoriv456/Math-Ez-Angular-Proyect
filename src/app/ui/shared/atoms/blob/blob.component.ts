import {Component, HostBinding, Input} from '@angular/core';
import {ColorSchema} from "../../../../core/models/color-schema.model";
import {ColorSchemas} from "../../../../core/config/color-schemas.config";

@Component({
  selector: 'ez-blob',
  templateUrl: './blob.component.html',
  styleUrl: './blob.component.css'
})
export class BlobComponent {
  @Input() @HostBinding('class') position: BlobPosition = 'left-top';

  @HostBinding('class.visible') protected isVisible = false;
  @HostBinding('style') protected colors = this.transformColorSchema(ColorSchemas.DEFAULT);

  public show() {
    this.isVisible = true;
  }

  public hide() {
    this.isVisible = false;
  }

  public changeColors(schema: ColorSchema) {
    this.colors = this.transformColorSchema(schema);
  }

  private transformColorSchema(schema: ColorSchema) {
    return {
      '--fill-col-1': schema.main,
      '--fill-col-2': schema.light1,
      '--fill-col-3': schema.light2,
    }
  }
}

type BlobPosition = 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';
