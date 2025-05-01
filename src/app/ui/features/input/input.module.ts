import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from "./input.component";
import { CharComponent } from './components/char/char.component';
import { FractionComponent } from './components/fraction/fraction.component';
import {CharClickedNotifierService} from "./services/char-clicked-notifier/char-clicked-notifier.service";
import { InputTermDirective } from './directives/input-term/input-term.directive';
import { ExponentComponent } from './components/exponent/exponent.component';
import { RootComponent } from './components/root/root.component';
import {WarningsService} from "./services/warnings/warnings.service";
import { FunctionComponent } from './components/function/function.component';
import { TermContainerComponent } from './components/term-container/term-container.component';
import { EditableTermContainerComponent } from './components/editable-term-container/editable-term-container.component';
import { ParenthesisComponent } from './components/parenthesis/parenthesis.component';
import { TermValidationWarningComponent } from './components/term-validation-warning/term-validation-warning.component';
import { InputTermValidationDirective } from './directives/input-term-validation/input-term-validation.directive';
import { CaretComponent } from './components/caret/caret.component';
import {ContextHandlerService} from "./services/context-handler/context-handler.service";
import {CaretHandlerService} from "./services/caret-handler/caret-handler.service";
import {CaretIndexService} from "./services/caret-index/caret-index.service";
import {WritingHandlerService} from "./services/wrting-handler/writing-handler.service";

@NgModule({
  declarations: [
    InputComponent,
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
    InputTermValidationDirective,
    CaretComponent
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
    ContextHandlerService,
    CaretHandlerService,
    WritingHandlerService,
    CaretIndexService
  ]
})
export class InputModule { }
