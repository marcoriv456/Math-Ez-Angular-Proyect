import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from "./input.component";
import {InputTestingEnvironmentComponent} from "./input-testing-environment/input-testing-environment.component";
import { CharComponent } from './components/char/char.component';
import { FractionComponent } from './components/fraction/fraction.component';
import {InputUtilitiesService} from "./services/caret-positioning/input-utilities.service";
import { InputTermDirective } from './directives/input-term.directive';
import { FractionChildComponent } from './components/fraction/fraction-child/fraction-child.component';
import { ExponentComponent } from './components/power/exponent.component';
import { RootComponent } from './components/root/root.component';
import {WarningsService} from "./services/warnings/warnings.service";
import {VariableProviderService} from "./services/variable-provider/variable-provider.service";
import { FunctionComponent } from './components/function/function.component';
import { TermContainerComponent } from './components/term-container/term-container.component';
import {TermValidationService} from "./services/term-validation/term-validation.service";
import { TermArgumentComponent } from './components/term-argument/term-argument.component';
import { RootMainContainerComponent } from './components/root/root-main-container/root-main-container.component';
import { FunctionMainContainerComponent } from './components/function/function-main-container/function-main-container.component';

@NgModule({
  declarations: [
    InputComponent,
    InputTestingEnvironmentComponent,
    CharComponent,
    FractionComponent,
    InputTermDirective,
    FractionChildComponent,
    ExponentComponent,
    RootComponent,
    FunctionComponent,
    TermContainerComponent,
    TermArgumentComponent,
    RootMainContainerComponent,
    FunctionMainContainerComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[
    InputUtilitiesService,
    WarningsService,
    VariableProviderService,
    TermValidationService
  ]
})
export class InputModule { }
