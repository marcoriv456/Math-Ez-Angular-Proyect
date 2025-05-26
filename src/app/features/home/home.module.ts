import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {InputModule} from "../../ui/features/input/input.module";
import {SharedModule} from "../../ui/shared/shared.module";
import {IntroductionComponent} from './ui/sections/introduction/introduction.component';
import {TopicsComponent} from './ui/sections/topics/topics.component';


@NgModule({
  declarations: [
    HomeComponent,
    IntroductionComponent,
    TopicsComponent
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
