import {AfterViewInit, Component, ElementRef, inject, Renderer2, ViewChild} from '@angular/core';
import {SubjectIntersectionObserver} from "../classes/subject-intersection-observer.class";
import {IntersectionObserverSubject} from "../models/IntersectionObserverSubject";
import {PageLocationService} from "../services/page-location/page-location.service";

@Component({
  selector: 'home-logo-section',
  templateUrl: './logo-section.component.html',
  styleUrl: './logo-section.component.css',})
export class LogoSectionComponent implements AfterViewInit {

  ref = inject(ElementRef)
  renderer=inject(Renderer2)
  pageLocationService=inject(PageLocationService)
  @ViewChild("logo")
  logoElement!:ElementRef
  @ViewChild("phrase")
  phraseElement!:ElementRef

  intersectionObserver!:SubjectIntersectionObserver;
  ngAfterViewInit() {
    this.intersectionObserver=new SubjectIntersectionObserver(this.thisAsSubject, this.renderer,this.pageLocationService)
    this.pageLocationService.addListener((newLocation)=>this.onPageLocationChange(newLocation))
  }
  get thisAsSubject():IntersectionObserverSubject{
    return {
      name:"logo-section",
      main:this.ref.nativeElement,
      children:[
        {
          ref: this.phraseElement.nativeElement,
          rootMargin:"-100% 0px 0px 0px"
        }
      ]
    }
  }
  onPageLocationChange(newLocation:string){
    console.log("listening from logo section: ",newLocation);
    //@ts-ignore
    this.actualLogoLocation=this.logoLocations[newLocation]
  }
  private introductionSectionLocation={
    left: '20%',
    top: '20%',
    transform: 'scale(0.6)'
  }

  private logoLocations={
    'logo-section':{
      left: '50%',
      top: '50%',
      transform:''
    },
    'introduction-section-panel-1':this.introductionSectionLocation,
    'introduction-section-panel-2':this.introductionSectionLocation,
    'introduction-section-panel-3':this.introductionSectionLocation,

  }



  protected actualLogoLocation=this.logoLocations["logo-section"]
}

