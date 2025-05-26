import {Component} from '@angular/core';
import {bgConfig} from "./core/config/bg-config2.config";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // @ViewChild('registerSection') registerSection!:ElementRef;

  // private renderer=inject(Renderer2)
  // private footerObserver=inject(FooterObserverService)
  // private ngZone = inject(NgZone)

  // private observerCallback= (entries: IntersectionObserverEntry[]) => {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting){
  //       this.renderer.addClass(entry.target, 'intersecting')
  //       this.renderer.addClass(entry.target, 'intersected')
  //     }
  //     else
  //       this.renderer.removeClass(entry.target, 'intersecting');
  //   })
  // }
  // private intersectionObserver=new IntersectionObserver(this.observerCallback,{threshold:0.6})
  //
  // private blobAnimations:BlobAnimation[]=[]

  // ngAfterViewInit() {
  // this.intersectionObserver.observe(this.registerSection.nativeElement)
  // this.observeFooter()
  // }

  // private observeFooter(){
  //   this.footerObserver.subscribe((value)=>{
  //     if(value=='enter')
  //       this.renderer.addClass(this.registerSection.nativeElement,'footer-intersecting')
  //     else
  //       this.renderer.removeClass(this.registerSection.nativeElement,'footer-intersecting')
  //   })
  // }

  // ngOnDestroy() {
  //   this.stopAnimations()
  // }

  // private stopAnimations(){
  //   this.blobAnimations.forEach(animation=>animation.stop())
  // }

  protected readonly bgConfig = bgConfig;
}
