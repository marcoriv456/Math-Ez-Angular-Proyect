import {AfterViewInit, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {SubjectIntersectionService} from "../services/subject-intersection/subject-intersection.service";
import {IntersectionObserverSubject} from "../models/IntersectionObserverSubject";

@Component({
  selector: 'home-log-in-section',
  templateUrl: './log-in-section.component.html',
  styleUrl: './log-in-section.component.css'
})
export class LogInSectionComponent implements AfterViewInit{
  ref=inject(ElementRef)
  intersectionObserverService=inject(SubjectIntersectionService)

  @ViewChild("form_container")
  formContainer!:ElementRef;
  @ViewChild("paragraph")
  paragraph!:ElementRef;

  ngAfterViewInit() {
    this.intersectionObserverService.addSubject(this.thisAsSubject)
  }
  private get thisAsSubject():IntersectionObserverSubject{
    return{
      main:this.ref.nativeElement,
      name:"log-in-section",
      children:[this.formContainer.nativeElement, this.paragraph.nativeElement]
    }
  }
}
