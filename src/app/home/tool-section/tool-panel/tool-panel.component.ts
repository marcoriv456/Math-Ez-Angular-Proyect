import {Component, Input} from '@angular/core';

@Component({
  selector: 'home-tool-section-panel',
  templateUrl: './tool-panel.component.html',
  styleUrl: './tool-panel.component.css'
})
export class ToolPanelComponent {
  @Input()
  iconSrc!:string
}
