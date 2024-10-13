import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {LogoSectionComponent} from "./logo-section/logo-section.component";



@NgModule({
  declarations: [
    HomeComponent,
    LogoSectionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
