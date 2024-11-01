import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from "./input.component";
import {InputTestingEnvironmentComponent} from "./input-testing-environment/input-testing-environment.component";
import { CharComponent } from './char/char.component';
import { FractionComponent } from './fraction/fraction.component';



@NgModule({
  declarations: [
    InputComponent,
    InputTestingEnvironmentComponent,
    CharComponent,
    FractionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InputModule { }
