import {AfterViewChecked, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'home-background-animation',
  templateUrl: './background-animation.component.html',
  styleUrl: './background-animation.component.css'
})
export class BackgroundAnimationComponent implements AfterViewChecked{
  @ViewChild("video")
  video!:ElementRef


  ngAfterViewChecked() {
    if(this.video.nativeElement.paused)
      this.video.nativeElement.play()
  }
}
