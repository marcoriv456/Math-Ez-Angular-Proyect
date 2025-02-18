import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from "./input.component";
import {InputTestingEnvironmentComponent} from "./input-testing-environment/input-testing-environment.component";
import { CharComponent } from './components/char/char.component';
import { FractionComponent } from './components/fraction/fraction.component';
import {CharClickedNotifierService} from "./services/char-clicked-notifier/char-clicked-notifier.service";
import { InputTermDirective } from './directives/input-term/input-term.directive';
import { ExponentComponent } from './components/exponent/exponent.component';
import { RootComponent } from './components/root/root.component';
import {WarningsService} from "./services/warnings/warnings.service";
import {VariableProviderService} from "./services/variable-provider/variable-provider.service";
import { FunctionComponent } from './components/function/function.component';
import { TermContainerComponent } from './components/term-container/term-container.component';
import { EditableTermContainerComponent } from './components/editable-term-container/editable-term-container.component';
import { ParenthesisComponent } from './components/parenthesis/parenthesis.component';
import { TermValidationWarningComponent } from './components/term-validation-warning/term-validation-warning.component';
import {InputEditableElement} from "./directives/input-editable-element/input-editable-element.directive";
import { InputTermValidationDirective } from './directives/input-term-validation/input-term-validation.directive';

@NgModule({
  declarations: [
    InputComponent,
    InputTestingEnvironmentComponent,
    CharComponent,
    FractionComponent,
    InputTermDirective,
    ExponentComponent,
    RootComponent,
    FunctionComponent,
    TermContainerComponent,
    EditableTermContainerComponent,
    ParenthesisComponent,
    TermValidationWarningComponent,
    InputTermValidationDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    InputComponent
  ],
  providers:[
    CharClickedNotifierService,
    WarningsService,
    VariableProviderService,
  ]
})
export class InputModule { }
