import {IntersectionObserverSubject} from "../models/IntersectionObserverSubject";
import {Renderer2} from "@angular/core";
import {PageLocationService} from "../services/page-location/page-location.service";

export class SubjectIntersectionObserver {
  constructor(private subject:IntersectionObserverSubject, private renderer:Renderer2, private pageLocationServiceRef:PageLocationService) {

    this.observers.push(...subject.children.map(
      (child)=>{
        let observer=new IntersectionObserver(
          (entries)=>{
            let mainElement=this.getMainElementFrom(entries)
            this.observersCallback(mainElement,child.ref)
            if(mainElement.isIntersecting)
              this.pageLocationServiceRef.setPageLocation(this.subject.name)
          },
          {rootMargin:child.rootMargin})
        observer.observe(subject.main)
        return observer
      }
    ))
  }

  private observers:IntersectionObserver[]=[]

  private getMainElementFrom(entries:IntersectionObserverEntry[]){
    return entries[0]
  }

  private observersCallback(element:IntersectionObserverEntry,childRef:HTMLElement){
    if(element.isIntersecting)
        this.renderer.removeClass(childRef,"out")
      else
        this.renderer.addClass(childRef,"out")
  }

}
