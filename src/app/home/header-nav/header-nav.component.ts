import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  QueryList, Renderer2,
  ViewChildren
} from '@angular/core';
import {topicsColorThemes} from "../../../assets/topics.color-themes";


@Component({
  selector: 'header-nav',
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.css'
})
export class HeaderNavComponent implements AfterViewInit{
  @Output()
  sectionHovered: EventEmitter<string> = new EventEmitter();
  @ViewChildren('sectionBtn')
  buttons!:QueryList<ElementRef>
  colors=topicsColorThemes
  homeColorThemes={
    start:{
      '--main': '#0090e9',
      '--darker': '#0042e9'
    },
    "introduction-1": {
      "--darker": "#00d706",
      "--main": "#80FF55"
    },
    "introduction-2": {
      "--darker": "#6300e4",
      "--main": "#6655FF"
    },
    "introduction-3": {
      "--darker": "#d70000",
      "--main": "#FF6363"
    },
    ...this.colors,
    'log-in':{
      '--main': '#0090e9',
      '--darker': '#0042e9'
    },
    'log-in-google':{
      '--main': '#e9d600',
      '--darker': '#e9a700'
    }


  }
  renderer=inject(Renderer2)

  ngAfterViewInit() {
    this.buttons.forEach(button=>{
      let buttonElement=button.nativeElement
      let buttonName=buttonElement.classList[0];
      this.renderer.listen(buttonElement,"mouseenter",()=>this.sectionHovered.emit(buttonName))
      this.renderer.listen(buttonElement,"mouseleave",()=>this.sectionHovered.emit("none"))
    })
  }

  get pageProgressionPercentage(){
    let totalHeight=document.querySelector(":root")?.scrollHeight||0
    let actualScrollPosition=window.scrollY
    let progressionPercentage= (actualScrollPosition*100)/totalHeight;
    console.log("progression percentage: ",progressionPercentage)
    return progressionPercentage
  }

}
