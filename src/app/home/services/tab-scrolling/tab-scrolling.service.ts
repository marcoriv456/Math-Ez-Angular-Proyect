import {Injectable, Renderer2, RendererFactory2} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabScrollingService {
  constructor() {}

  moveScrollTo(element:HTMLElement){
    let elementSection=element.parentElement
    if(!elementSection)
      return
    window.scrollTo({top:elementSection.offsetTop})
  }

}
