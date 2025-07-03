import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParticlesComponent} from './atoms/particles/particles.component';
import {H1Component} from './atoms/h1/h1.component';
import {PComponent} from './atoms/p/p.component';
import {H2Component} from './atoms/h2/h2.component';
import {H3Component} from './atoms/h3/h3.component';
import {ButtonComponent} from './atoms/button/button.component';
import {RellaxDirective} from './directives/rellax/rellax.directive';


@NgModule({
  declarations: [
    ParticlesComponent,
    H1Component,
    H2Component,
    H3Component,
    PComponent,
    ButtonComponent,
    RellaxDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ParticlesComponent,
    H1Component,
    H2Component,
    H3Component,
    PComponent,
    ButtonComponent,
    RellaxDirective
  ]
})
export class SharedModule {
}
