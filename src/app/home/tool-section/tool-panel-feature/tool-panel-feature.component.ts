import {Component, ElementRef, HostListener, inject, Input} from '@angular/core';
import {SubjectIntersectionService} from "../../services/subject-intersection/subject-intersection.service";
import {TabScrollingService} from "../../services/tab-scrolling/tab-scrolling.service";

@Component({
  selector: 'home-tool-section-panel-feature',
  templateUrl: './tool-panel-feature.component.html',
  styleUrl: './tool-panel-feature.component.css'
})
export class ToolPanelFeatureComponent {
  @Input()
  iconSrc!:string;
  private tabScrollingService=inject(TabScrollingService)
  private ref=inject(ElementRef)


  get maskUrl(){
    return `url("${this.iconSrc}")`;
  }
  @HostListener('focusin')
  onFocus(){
    let section=this.parentSection
    if(!section)
      return
    this.tabScrollingService.moveScrollTo(section)
  }
  private get parentSection(){
    return this.ref.nativeElement.closest("section")
  }

}
