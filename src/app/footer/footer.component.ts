import {AfterViewInit, Component, ElementRef, inject} from '@angular/core';
import {FooterObserverService} from "./service/footer-observer.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements AfterViewInit{
  private ref=inject(ElementRef).nativeElement as HTMLElement
  private footerService=inject(FooterObserverService)
  private observer=new IntersectionObserver((entries)=>{
    let self=entries[0]
    if(self.isIntersecting)
      this.footerService.emit('enter')
    else
      this.footerService.emit('exit')
  },{threshold:0.7})

  ngAfterViewInit() {
    this.observer.observe(this.ref)
  }
}
