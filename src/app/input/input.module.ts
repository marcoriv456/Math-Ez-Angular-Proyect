import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from "./input.component";
import {InputTestingEnvironmentComponent} from "./input-testing-environment/input-testing-environment.component";
import { CharComponent } from './char/char.component';
import { FractionComponent } from './fraction/fraction.component';
import {InputUtilitiesService} from "./services/caret-positioning/input-utilities.service";
import { InputTermDirective } from './directives/input-term.directive';
import { FractionChildComponent } from './fraction/fraction-child/fraction-child.component';
import { ExponentComponent } from './power/exponent.component';
import { RootComponent } from './root/root.component';

@NgModule({
  declarations: [
    InputComponent,
    InputTestingEnvironmentComponent,
    CharComponent,
    FractionComponent,
    InputTermDirective,
    FractionChildComponent,
    ExponentComponent,
    RootComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[
    InputUtilitiesService
  ]
})
export class InputModule { }
