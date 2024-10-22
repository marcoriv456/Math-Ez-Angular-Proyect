import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  Renderer2,
  ViewChild
} from '@angular/core';

import {IntersectionObserverSubject} from "../../models/IntersectionObserverSubject";
import {SubjectIntersectionObserver} from "../../classes/subject-intersection-observer.class";

@Component({
  selector: 'home-introduction-section-panel',
  templateUrl: './introduction-panel.component.html',
  styleUrl: './introduction-panel.component.css'
})
export class IntroductionPanelComponent implements AfterViewInit{
  @Input()
  sectionNumber!:number
  @Input()
  colorClass!:string

  @ViewChild("panel__text")
  panelText!:ElementRef;
  @ViewChild("panel__illustration")
  panelIllustration!:ElementRef

  ref=inject(ElementRef)
  renderer=inject(Renderer2)
  intersectionObserver!:SubjectIntersectionObserver;
  ngAfterViewInit() {
    this.intersectionObserver=new SubjectIntersectionObserver(this.thisAsSubject,this.renderer)
  }

  get thisAsSubject():IntersectionObserverSubject{
    return{
      main:this.ref.nativeElement,
      children:[
        {
          ref:this.panelText.nativeElement,
          rootMargin:"-20% 0px -80% 0px"
        },
        {
          ref:this.panelIllustration.nativeElement,
          rootMargin:"0px 0px -100% 0px"
        }
      ]
    }
  }

  protected getImageRoute(imageType:'main'|'secondary--first'|'secondary--second'|'secondary--third'){
    return `url("/assets/home/introduction-section/section-${this.sectionNumber}/${imageType}.png")`
  }

}
