import {AfterViewInit, Component, ElementRef, HostBinding, inject} from '@angular/core';

@Component({
  selector: 'home-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements AfterViewInit {
  private readonly ref = inject(ElementRef)
  @HostBinding('class.intersecting') protected isIntersecting = false

  private readonly observer = new IntersectionObserver(entries => {
    this.isIntersecting = entries[0].isIntersecting
    console.log(this.isIntersecting)
  }, {threshold: 0.5})

  ngAfterViewInit() {
    this.observer.observe(this.ref.nativeElement)
  }

}
