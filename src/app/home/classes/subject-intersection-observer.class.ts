import {IntersectionObserverSubject} from "../models/IntersectionObserverSubject";
import {Renderer2} from "@angular/core";

export class SubjectIntersectionObserver {
  constructor(subject:IntersectionObserverSubject, private renderer:Renderer2,) {

    this.observers.push(...subject.children.map(
      (child)=>{
        let observer=new IntersectionObserver(
          (entries)=>this.observersCallback(this.getMainElementFrom(entries),child.ref),
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
