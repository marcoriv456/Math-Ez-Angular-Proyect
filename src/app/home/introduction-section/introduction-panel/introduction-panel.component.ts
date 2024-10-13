import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-introduction-panel',
  templateUrl: './introduction-panel.component.html',
  styleUrl: './introduction-panel.component.css'
})
export class IntroductionPanelComponent {
  @Input()
  title!:string;
  @Input()
  textContent!:string;
  @Input()
  mainImageUrl!:string
  @Input()
  secondaryImagesUrls!:string[]

  @Input()
  colorClass!:string
}
