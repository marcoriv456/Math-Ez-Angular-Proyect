import {inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {PageLocationService} from "../page-location/page-location.service";
import {IntersectionObserverSubject} from "../../models/IntersectionObserverSubject";
import {FooterService} from "../../../footer/footer.service";

@Injectable()
export class SubjectIntersectionService {
  constructor(rendererFactory:RendererFactory2) {
    this.renderer=rendererFactory.createRenderer(null,null)
    this.footerService.footerInitialized.subscribe(()=>this.observeFooter())
  }

  private pageLocationService=inject(PageLocationService)
  private footerService=inject(FooterService)
  private observer=new IntersectionObserver(
    (entries)=>{entries.forEach((entry)=>this.entryCallback(entry))
    },{
      rootMargin:"-20% 0px -80% 0px"
    })
  private renderer!:Renderer2
  private subjects:IntersectionObserverSubject[]=[]


  private entryCallback(entry:IntersectionObserverEntry){
    let entrySubject=this.getSubjectFromEntry(entry.target as HTMLElement)
    let subjectChildren=entrySubject.children
    if(entry.isIntersecting){
      this.pageLocationService.setPageLocation(entrySubject.name)
      this.removeOutStateOfChildren(subjectChildren)
    }
    else
      this.addOutStateOfChildren(subjectChildren)

  }

  private removeOutStateOfChildren(subjectChildren:HTMLElement[]){
    subjectChildren.forEach(child=>this.renderer.removeClass(child,"out"))
  }
  private addOutStateOfChildren(subjectChildren:HTMLElement[]){
    subjectChildren.forEach(child=>this.renderer.addClass(child,"out"))
  }

  private getSubjectFromEntry(target:HTMLElement){
    return this.subjects.find((subject)=>subject.main==target) as IntersectionObserverSubject
  }
  addSubject(subject:IntersectionObserverSubject){
    this.subjects.push(subject)
    this.observer.observe(subject.main)
  }

  observeFooter(){
    let footer=this.footerService.footerRef.nativeElement
    let footerObserver=new IntersectionObserver((entries)=>{
      let footer=entries[0]
      if(footer.isIntersecting)
        this.pageLocationService.setPageLocation('footer')
    })
    footerObserver.observe(footer)
  }
}
