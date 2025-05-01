import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {InputModule} from "../../features/input/input.module";
import {NgxParticlesModule} from "@tsparticles/angular";



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    NgxParticlesModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
