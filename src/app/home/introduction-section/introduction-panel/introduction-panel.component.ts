import {Component, Input} from '@angular/core';

@Component({
  selector: 'home-introduction-section-panel',
  templateUrl: './introduction-panel.component.html',
  styleUrl: './introduction-panel.component.css'
})
export class IntroductionPanelComponent {
  @Input()
  sectionNumber!:number
  @Input()
  colorClass!:string
}
