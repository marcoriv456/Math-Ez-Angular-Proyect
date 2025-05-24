import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {InputModule} from "../../ui/features/input/input.module";
import {SharedModule} from "../../ui/shared/shared.module";
import {IntroductionComponent} from './ui/sections/introduction/introduction.component';


@NgModule({
  declarations: [
    HomeComponent,
    IntroductionComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    SharedModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
