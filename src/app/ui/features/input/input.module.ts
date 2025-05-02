import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputComponent} from "./input.component";
import { CharComponent } from './ui/terms/char/char.component';
import { FractionComponent } from './ui/terms/fraction/fraction.component';
import {CharClickedNotifierService} from "./core/services/char-clicked-notifier/char-clicked-notifier.service";
import { InputTermDirective } from './directives/input-term/input-term.directive';
import { ExponentComponent } from './ui/terms/exponent/exponent.component';
import { RootComponent } from './ui/terms/root/root.component';
import {WarningsService} from "./core/services/warnings/warnings.service";
import { FunctionComponent } from './ui/terms/function/function.component';
import { TermContainerComponent } from './ui/atoms/term-container/term-container.component';
import { EditableTermContainerComponent } from './ui/molecules/editable-term-container/editable-term-container.component';
import { ParenthesisComponent } from './ui/terms/parenthesis/parenthesis.component';
import { TermValidationWarningComponent } from './ui/organisms/term-validation-warning/term-validation-warning.component';
import { InputTermValidationDirective } from './directives/input-term-validation/input-term-validation.directive';
import { CaretComponent } from './ui/organisms/caret/caret.component';
import {ContextHandlerService} from "./core/services/context-handler/context-handler.service";
import {CaretHandlerService} from "./core/services/caret-handler/caret-handler.service";
import {CaretIndexService} from "./core/services/caret-index/caret-index.service";
import {WritingHandlerService} from "./core/services/wrting-handler/writing-handler.service";

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
