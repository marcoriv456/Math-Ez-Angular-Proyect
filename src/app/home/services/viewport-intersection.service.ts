import {Inject, inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {IntersectionObserverSubject} from "../models/IntersectionObserverSubject";
import {VP_INTERSECT_CONFIG_ROOT_MARGIN} from "../inject-tokens/viewport-intersection-config.token";

@Injectable()
export class ViewportIntersectionService {
  constructor(rendererFactory:RendererFactory2,  @Inject(VP_INTERSECT_CONFIG_ROOT_MARGIN)rootMargin:string) {


    this.renderer=rendererFactory.createRenderer(null,null)
    this.intersectionObserver=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        let subjectChildren=this.getSubject(entry.target as HTMLElement).children
        if(entry.isIntersecting)
          subjectChildren.forEach(child=>this.renderer.removeClass(child,"out"))
        else
          subjectChildren.forEach(child=>this.renderer.addClass(child,"out"))
      })
    },
    {rootMargin:rootMargin})
  }

  private subjects: IntersectionObserverSubject[]=[]
  private renderer!:Renderer2

  private getSubject(subject:HTMLElement){
    return this.subjects.find(element=>element.main==subject) as IntersectionObserverSubject
  }

  private intersectionObserver!:IntersectionObserver;

  addSubject(subject:IntersectionObserverSubject){
    this.subjects.push(subject)
    this.intersectionObserver.observe(subject.main)
  }
}
