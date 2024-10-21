import {AfterViewInit, Component, ElementRef, inject, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {Element} from "@angular/compiler";
import {ViewportIntersectionService} from "../services/viewport-intersection.service";
import { VP_INTERSECT_CONFIG_ROOT_MARGIN } from "../inject-tokens/viewport-intersection-config.token";

@Component({
  selector: 'home-logo-section',
  templateUrl: './logo-section.component.html',
  styleUrl: './logo-section.component.css',
  providers:[
    {
      provide:VP_INTERSECT_CONFIG_ROOT_MARGIN,
      useValue:"-60% 0px 0px 0px "
    },
    ViewportIntersectionService
  ]
})
export class LogoSectionComponent implements AfterViewInit {

  ref = inject(ElementRef)
  @ViewChild("logo")
  logoElement!:ElementRef
  @ViewChild("phrase")
  phraseElement!:ElementRef
  intersectionService=inject(ViewportIntersectionService)
  ngAfterViewInit() {
    this.intersectionService.addSubject({
      main:this.ref.nativeElement,
      children:[
        this.logoElement.nativeElement,
        this.phraseElement.nativeElement
      ]
    })
  }
}
