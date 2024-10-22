import {AfterViewInit, Component, ElementRef, inject, Renderer2, ViewChild} from '@angular/core';
import {SubjectIntersectionService} from "../services/subject-intersection/subject-intersection.service";
import {IntersectionObserverSubject} from "../models/IntersectionObserverSubject";

@Component({
  selector: 'home-tool-section',
  templateUrl: './tool-section.component.html',
  styleUrl: './tool-section.component.css'
})
export class ToolSectionComponent implements AfterViewInit{
  @ViewChild("title_container")
  titleContainer!:ElementRef
  @ViewChild("text1")
  text1!:ElementRef
  @ViewChild("text2")
  text2!:ElementRef

  intersectionObserverService=inject(SubjectIntersectionService)

  ngAfterViewInit() {
    this.intersectionObserverService.addSubject(this.titleContainerAsSubject)
  }

  private get titleContainerAsSubject():IntersectionObserverSubject{
    return {
      name:'tool-section-title',
      main:this.titleContainer.nativeElement,
      children:[this.text2.nativeElement,this.text1.nativeElement]
    }
  }
}
