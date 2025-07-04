import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'ez-blob',
  templateUrl: './blob.component.html',
  styleUrl: './blob.component.css'
})
export class BlobComponent {
  @Input() @HostBinding('class') position: BlobPosition = 'left-top';

  @HostBinding('class.visible') protected isVisible = false;

  public show() {
    this.isVisible = true;
  }

  public hide() {
    this.isVisible = false;
  }
}

type BlobPosition = 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';
