import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from "./input.component";
import {InputTestingEnvironmentComponent} from "./input-testing-environment/input-testing-environment.component";



@NgModule({
  declarations: [
    InputComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class InputModule { }
