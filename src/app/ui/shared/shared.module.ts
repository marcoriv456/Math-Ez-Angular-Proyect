import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParticlesComponent} from './atoms/particles/particles.component';
import {H1Component} from './atoms/h1/h1.component';
import {PComponent} from './atoms/p/p.component';


@NgModule({
  declarations: [
    ParticlesComponent,
    H1Component,
    PComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ParticlesComponent,
    H1Component,
    PComponent
  ]
})
export class SharedModule {
}
