import {AfterViewInit, Component, ElementRef, inject, Renderer2, ViewChild} from '@angular/core';
import {PageLocationService} from "../services/page-location/page-location.service";
import {SubjectIntersectionService} from "../services/subject-intersection/subject-intersection.service";
import {IntersectionObserverSubject} from "../models/IntersectionObserverSubject";

@Component({
  selector: 'home-logo-section',
  templateUrl: './logo-section.component.html',
  styleUrl: './logo-section.component.css',})
export class LogoSectionComponent implements AfterViewInit {

  ref = inject(ElementRef)
  pageLocationService=inject(PageLocationService)
  intersectionObserverService=inject(SubjectIntersectionService)
  @ViewChild("logo")
  logoElement!:ElementRef
  @ViewChild("phrase")
  phraseElement!:ElementRef

  ngAfterViewInit() {
    this.intersectionObserverService.addSubject(this.thisAsSubject)
    this.pageLocationService.addListener((newLocation)=>this.onPageLocationChange(newLocation))
  }
  get thisAsSubject():IntersectionObserverSubject{
    return {
      name:"logo-section",
      main:this.ref.nativeElement,
      children:[this.phraseElement.nativeElement]
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
    'tool-section-title':{
      transform:"scale(0.6)"
    }

  }



  protected actualLogoLocation=this.logoLocations["logo-section"]
}

