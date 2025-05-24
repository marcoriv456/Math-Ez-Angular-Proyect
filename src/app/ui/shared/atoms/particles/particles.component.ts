import {AfterViewInit, Component, inject, Input, NgZone} from '@angular/core';
import {tsParticles} from "@tsparticles/engine";
import {IParticlesProps} from "@tsparticles/angular";
import {loadSlim} from "@tsparticles/slim";

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrl: './particles.component.css'
})
export class ParticlesComponent implements AfterViewInit {
  @Input() options!: IParticlesProps;
  @Input() particlesId!: string

  private ngZone = inject(NgZone)

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(async () => {
      await tsParticles.load({id: this.particlesId, options: this.options})
      await loadSlim(tsParticles)
    })
  }
}
