import {AfterViewInit, Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {SubjectIntersectionService} from "../../services/subject-intersection/subject-intersection.service";
import {IntersectionObserverSubject} from "../../models/IntersectionObserverSubject";

@Component({
  selector: 'home-tool-section-panel',
  templateUrl: './tool-panel.component.html',
  styleUrl: './tool-panel.component.css'
})
export class ToolPanelComponent implements AfterViewInit{
  @Input()
  iconSrc!:string

  ref=inject(ElementRef)
  intersectionObserverService=inject(SubjectIntersectionService)
  ngAfterViewInit() {
    this.intersectionObserverService.addSubject(this.thisAsSubject)
  }

  private get thisAsSubject():IntersectionObserverSubject{
    return{
      main:this.ref.nativeElement,
      children:[],
      name:"tool-section-"+this.panelName
    }
  }
  private get panelName(){
    return this.ref.nativeElement.id
  }

}
