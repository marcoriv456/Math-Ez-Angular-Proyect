import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParticlesComponent} from './atoms/particles/particles.component';


@NgModule({
  declarations: [
    ParticlesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ParticlesComponent
  ]
})
export class SharedModule {
}
