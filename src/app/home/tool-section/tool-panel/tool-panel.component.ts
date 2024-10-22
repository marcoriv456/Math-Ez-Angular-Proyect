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
  @ViewChild("text_container")
  text_container!:ElementRef;

  @ViewChild("animation_video")
  animationVideo!:ElementRef;

  @Input()
  animationSrc!:string;


  ref=inject(ElementRef)
  intersectionObserverService=inject(SubjectIntersectionService)
  ngAfterViewInit() {
    let subject=this.thisAsSubject
    if(this.animationVideo)
      subject.children.push(this.animationVideo.nativeElement)
    this.intersectionObserverService.addSubject(subject)

  }

  private get thisAsSubject():IntersectionObserverSubject{
    return{
      main:this.ref.nativeElement,
      children:[this.text_container.nativeElement],
      name:"tool-section-"+this.panelName
    }
  }
  private get panelName(){
    return this.ref.nativeElement.id
  }
  protected get maskUrl(){
    return`url("${this.iconSrc}")`
  }
}
