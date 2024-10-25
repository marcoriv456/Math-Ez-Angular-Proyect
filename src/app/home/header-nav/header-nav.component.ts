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

    // ngAfterViewInit() {
  //   this.buttons.forEach(button=>{
  //     let buttonElement=button.nativeElement
  //     let buttonName=buttonElement.classList[0];
  //     this.renderer.listen(buttonElement,"mouseenter",()=>this.sectionHovered.emit(buttonName))
  //     this.renderer.listen(buttonElement,"mouseleave",()=>this.sectionHovered.emit("none"))
  //   })
  // }

  get pageProgressionPercentage(){
    let totalHeight=document.querySelector(":root")?.scrollHeight||0
    let actualScrollPosition=window.scrollY
    let progressionPercentage= (actualScrollPosition*100)/totalHeight;
    console.log("progression percentage: ",progressionPercentage)
    return progressionPercentage
  }

}
