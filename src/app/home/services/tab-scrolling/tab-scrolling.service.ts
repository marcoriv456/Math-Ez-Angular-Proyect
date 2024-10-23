import {Injectable, Renderer2, RendererFactory2} from '@angular/core';

@Injectable()
export class TabScrollingService {
  constructor() {}

  moveScrollTo(element:HTMLElement){
    if(!element)
      return
    window.scrollTo({top:element.offsetTop})
  }

}
