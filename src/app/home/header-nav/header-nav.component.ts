import { AfterViewInit, Component, inject } from '@angular/core';
import {topicsColorThemes} from "../../../assets/topics.color-themes";
import {PageLocationService} from "../services/page-location/page-location.service";

@Component({
  selector: 'header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css','../../../assets/styles/section-color-themes.css']
})
export class HeaderNavComponent implements AfterViewInit{
  private pageLocationService=inject(PageLocationService)

  private barStyleOnEveryLocation={
    'logo-section': {
      width: '0%',
      colorClass: '--sct-start'
    },
    'introduction-section-panel-1': {
      width: '9%',
      colorClass: '--sct-introduction-1'
    },
    'introduction-section-panel-2': {
      width: '18%',
      colorClass: '--sct-introduction-2'
    },
    'introduction-section-panel-3': {
      width: '27%',
      colorClass: '--sct-introduction-3'
    },
    'tool-section-title': {
      width: '36%',
      colorClass: '--sct-start'
    },
    'tool-section-panel--algebra': {
      width: '45%',
      colorClass: '--sct-algebra'
    },
    'tool-section-panel--calculus': {
      width: '54%',
      colorClass: '--sct-calculus'
    },
    'tool-section-panel--logic': {
      width: '63%',
      colorClass: '--sct-logic'
    },
    'tool-section-panel--graphics': {
      width: '72%',
      colorClass: '--sct-graphics'
    },
    'tool-section-panel--measures': {
      width: '81%',
      colorClass: '--sct-measures'
    },
    'tool-section-panel--statistics': {
      width: '90%',
      colorClass: '--sct-statistics'
    },
    'log-in-section': {
      width: '100%',
      colorClass: '--sct-log-in'
    }
  }


  barStyle=this.barStyleOnEveryLocation["logo-section"]

  ngAfterViewInit() {
    this.pageLocationService.addListener((location)=>{
      //@ts-ignore
      this.barStyle=this.barStyleOnEveryLocation[location]
    })
  }
}
