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
  renderer=inject(Renderer2)

  ngAfterViewInit() {
    this.buttons.forEach(button=>{
      let buttonElement=button.nativeElement
      let buttonName=buttonElement.classList[0];
      this.renderer.listen(buttonElement,"mouseenter",()=>this.sectionHovered.emit(buttonName))
      this.renderer.listen(buttonElement,"mouseleave",()=>this.sectionHovered.emit("none"))
    })
  }


}
