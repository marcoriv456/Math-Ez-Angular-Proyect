import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from "./input.component";
import {InputTestingEnvironmentComponent} from "./input-testing-environment/input-testing-environment.component";
import { CharComponent } from './char/char.component';
import { FractionComponent } from './fraction/fraction.component';
import {CaretPositioningService} from "./services/caret-positioning/caret-positioning.service";
import { InputTermDirective } from './directives/input-term.directive';
import { NumeratorComponent } from './fraction/numerator/numerator.component';
import { DenominatorComponent } from './fraction/denominator/denominator.component';



@NgModule({
  declarations: [
    InputComponent,
    InputTestingEnvironmentComponent,
    CharComponent,
    FractionComponent,
    InputTermDirective,
    NumeratorComponent,
    DenominatorComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[
    CaretPositioningService
  ]
})
export class InputModule { }
