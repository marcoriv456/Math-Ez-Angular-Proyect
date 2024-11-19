import {Component, inject} from '@angular/core';
import {ExperimentalVariableProviderService} from "./experimental-variable-provider.service";

@Component({
  selector: 'app-input-testing-environment',
  templateUrl: './input-testing-environment.component.html',
  styleUrl: './input-testing-environment.component.css'
})
export class InputTestingEnvironmentComponent {
  expVariableProvider=inject(ExperimentalVariableProviderService)
}
