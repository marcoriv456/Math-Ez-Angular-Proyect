import {AfterViewInit, Component, inject, NgZone, OnDestroy} from '@angular/core';
import {BlobAnimation} from "../../../core/helpers/blob-animator.helper";
import {SharedModule} from "../../shared/shared.module";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [
    SharedModule
  ]
})
export class HeaderComponent implements AfterViewInit,OnDestroy{
  private bgBlobAnimation!:BlobAnimation;

  private readonly ngZone = inject(NgZone)

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.bgBlobAnimation = new BlobAnimation('header .background', 3, 4)
      this.bgBlobAnimation.init({duration: 3000, layerDelay: 500})
    })
  }
  ngOnDestroy() {
    this.bgBlobAnimation.stop()
  }
}
