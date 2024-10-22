import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild
} from '@angular/core';
import {SubjectIntersectionService} from "../../services/subject-intersection/subject-intersection.service";
import {IntersectionObserverSubject} from "../../models/IntersectionObserverSubject";

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
  intersectionObserverService=inject(SubjectIntersectionService)
  ngAfterViewInit() {
    this.intersectionObserverService.addSubject(this.thisAsSubject)
  }

  get thisAsSubject():IntersectionObserverSubject{
    return{
      name:"introduction-section-panel-"+this.sectionNumber,
      main:this.ref.nativeElement,
      children:[this.panelText.nativeElement,this.panelIllustration.nativeElement]
    }
  }

  protected getImageRoute(imageType:'main'|'secondary--first'|'secondary--second'|'secondary--third'){
    return `url("/assets/home/introduction-section/section-${this.sectionNumber}/${imageType}.png")`
  }

}
