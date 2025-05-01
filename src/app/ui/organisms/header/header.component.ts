import {AfterViewInit, Component, ElementRef, inject, OnDestroy} from '@angular/core';
import {interpolate} from "flubber";
import {FlubberAnimation} from "../../../core/helpers/flubber-animation.helper";
import {BlobAnimation} from "../../../core/helpers/blob-animator.helper";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl:'./header.component.css'
})
export class HeaderComponent implements AfterViewInit,OnDestroy{
  private bgBlobAnimation!:BlobAnimation;

  ngAfterViewInit() {
    this.bgBlobAnimation=new BlobAnimation('header .background',3,4)
    this.bgBlobAnimation.init({duration:3000,layerDelay:500})
  }
  ngOnDestroy() {
    this.bgBlobAnimation.stop()
  }
}
