import {AfterViewInit, Component, ElementRef, inject, Renderer2, ViewChild} from '@angular/core';
import {SubjectIntersectionObserver} from "../classes/subject-intersection-observer.class";
import {IntersectionObserverSubject} from "../models/IntersectionObserverSubject";

@Component({
  selector: 'home-logo-section',
  templateUrl: './logo-section.component.html',
  styleUrl: './logo-section.component.css',})
export class LogoSectionComponent implements AfterViewInit {

  ref = inject(ElementRef)
  renderer=inject(Renderer2)
  @ViewChild("logo")
  logoElement!:ElementRef
  @ViewChild("phrase")
  phraseElement!:ElementRef

  intersectionObserver!:SubjectIntersectionObserver;

  ngAfterViewInit() {
    this.intersectionObserver=new SubjectIntersectionObserver(this.thisAsSubject, this.renderer)
  }

  get thisAsSubject():IntersectionObserverSubject{
    return {
      main:this.ref.nativeElement,
      children:[
        {
          ref:this.logoElement.nativeElement,
          rootMargin:"-20% 0px 0px 0px"
        },
        {
          ref: this.phraseElement.nativeElement,
          rootMargin:"-100% 0px 0px 0px"
        }
      ]
    }
  }
}
