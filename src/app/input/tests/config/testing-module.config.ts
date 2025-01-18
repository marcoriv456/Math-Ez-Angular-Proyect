import {InputComponent} from "../../input.component";
import {InputTestingEnvironmentComponent} from "../../input-testing-environment/input-testing-environment.component";
import {CharComponent} from "../../components/char/char.component";
import {FractionComponent} from "../../components/fraction/fraction.component";
import {InputTermDirective} from "../../directives/input-term/input-term.directive";
import {FractionChildComponent} from "../../components/fraction/fraction-child/fraction-child.component";
import {ExponentComponent} from "../../components/exponent/exponent.component";
import {RootComponent} from "../../components/root/root.component";
import {FunctionComponent} from "../../components/function/function.component";
import {TermContainerComponent} from "../../components/term-container/term-container.component";
import {TermArgumentComponent} from "../../components/term-argument/term-argument.component";
import {
  EditableTermContainerComponent
} from "../../components/editable-term-container/editable-term-container.component";
import {ParenthesisComponent} from "../../components/parenthesis/parenthesis.component";
import {
  TermValidationWarningComponent
} from "../../components/term-validation-warning/term-validation-warning.component";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CharClickedNotifierService} from "../../services/char-clicked-notifier/char-clicked-notifier.service";
import {WarningsService} from "../../services/warnings/warnings.service";
import {VariableProviderService} from "../../services/variable-provider/variable-provider.service";

export const testingModuleConfig={
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
    EditableTermContainerComponent,
    ParenthesisComponent,
    TermValidationWarningComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [
    CharClickedNotifierService,
    WarningsService,
    VariableProviderService,
  ],

}
