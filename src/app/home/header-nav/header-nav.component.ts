import { Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import {topicsColorThemes} from "../../../assets/topics.color-themes";

@Component({
  selector: 'header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css','../../../assets/styles/section-color-themes.css']
})
export class HeaderNavComponent{
  @Output()
  sectionHovered: EventEmitter<string> = new EventEmitter();
  @ViewChildren('sectionBtn')
  buttons!:QueryList<ElementRef>

  get pageProgressionPercentage(){
    let totalHeight=document.querySelector(":root")?.scrollHeight||0
    let actualScrollPosition=window.scrollY
    let progressionPercentage= (actualScrollPosition*100)/totalHeight;
    console.log("progression percentage: ",progressionPercentage)
    return progressionPercentage
  }

}
