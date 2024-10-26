import {AfterViewInit, Component, ElementRef, inject} from '@angular/core';
import {FooterService} from "./footer.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements AfterViewInit{
  ref=inject(ElementRef)
  footerService=inject(FooterService)

  ngAfterViewInit() {
    this.footerService.footerRef=this.ref
    this.footerService.footerInitialized.emit()
  }
}
