import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticlesComponent } from './atoms/particles/particles.component';
import { H1Component } from './atoms/h1/h1.component';
import { PComponent } from './atoms/p/p.component';
import { H2Component } from './atoms/h2/h2.component';
import { H3Component } from './atoms/h3/h3.component';
import { ButtonComponent } from './atoms/button/button.component';
import { RellaxDirective } from './directives/rellax/rellax.directive';
import { BlobComponent } from './atoms/blob/blob.component';
import { H4Component } from './atoms/h4/h4.component';

@NgModule({
  declarations: [
    ParticlesComponent,
    H1Component,
    H2Component,
    H3Component,
    H4Component,
    PComponent,
    ButtonComponent,
    RellaxDirective,
    BlobComponent,
  ],
  imports: [CommonModule],
  exports: [
    ParticlesComponent,
    H1Component,
    H2Component,
    H3Component,
    H4Component,
    PComponent,
    ButtonComponent,
    RellaxDirective,
    BlobComponent,
  ],
})
export class SharedModule {}
