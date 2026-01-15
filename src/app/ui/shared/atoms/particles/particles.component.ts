import { AfterViewInit, Component, inject, Input, NgZone } from '@angular/core';
import { loadFull } from 'tsparticles';
import { loadEmittersPlugin } from '@tsparticles/plugin-emitters';
import {
  IParticlesOptions,
  RecursivePartial,
  tsParticles,
} from '@tsparticles/engine';
import { loadImageShape } from '@tsparticles/shape-image';

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrl: './particles.component.css',
})
export class ParticlesComponent implements AfterViewInit {
  @Input() options!: RecursivePartial<IParticlesOptions>;
  @Input() particlesId!: string;

  private ngZone = inject(NgZone);

  async ngAfterViewInit() {
    await this.ngZone
      .runOutsideAngular(async () => {
        await loadEmittersPlugin(tsParticles);
        await loadImageShape(tsParticles);
        await loadFull(tsParticles);
        await tsParticles.load({ id: this.particlesId, options: this.options });
      })
      .catch((error) =>
        console.error('Error while loading particles: ', error),
      );
  }
}
