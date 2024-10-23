import {Component, ElementRef, HostListener, inject, Input} from '@angular/core';
import {SubjectIntersectionService} from "../../services/subject-intersection/subject-intersection.service";
import {TabScrollingService} from "../../services/tab-scrolling/tab-scrolling.service";
import {AnimatedTabAccessibleElement} from "../../models/AnimatedTabAccessibleElement";

@Component({
  selector: 'home-tool-section-panel-feature',
  templateUrl: './tool-panel-feature.component.html',
  styleUrl: './tool-panel-feature.component.css'
})
export class ToolPanelFeatureComponent extends AnimatedTabAccessibleElement{
  @Input()
  iconSrc!:string;
  tabScrollingService=inject(TabScrollingService)
  private ref=inject(ElementRef)

  get maskUrl(){
    return `url("${this.iconSrc}")`;
  }

  @HostListener('focusin')
  override onFocus() { super.onFocus() }

  getParentSection(){
    return this.ref.nativeElement.closest("home-tool-section-panel")
  }

}
