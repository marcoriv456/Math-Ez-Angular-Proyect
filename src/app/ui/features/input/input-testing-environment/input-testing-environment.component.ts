import {AfterViewInit, Component, inject, ViewChild, ViewChildren} from '@angular/core';
import {ExperimentalVariableProviderService} from "./experimental-variable-provider.service";
import {InputComponent} from "../input.component";
import {Term} from "../core/models/terms/term.model";
import {InputModule} from "../input.module";

@Component({
  selector: 'app-input-testing-environment',
  templateUrl: './input-testing-environment.component.html',
  styleUrl: './input-testing-environment.component.css',
  standalone: true,
  imports: [
    InputModule
  ],
  providers: [
    ExperimentalVariableProviderService
  ]
})
export class InputTestingEnvironmentComponent implements AfterViewInit {
  expVariableProvider = inject(ExperimentalVariableProviderService)
  terms: Term[] = []

  @ViewChild(InputComponent) inputComponent!: InputComponent

  ngAfterViewInit() {
    this.inputComponent.variableHandler.setVariableProvider(this.expVariableProvider)
    this.inputComponent.setTerms(
      {char: '1', type: 'char'},
      {char: '2', type: 'char'},
      {char: '3', type: 'char'},
      {char: '4', type: 'char'},
      {char: '5', type: 'char'},
      {char: '6', type: 'char'},
      {char: '7', type: 'char'},
      {char: '8', type: 'char'},
      {char: '9', type: 'char'},
      {char: ' ', type: 'char'},
      {
        numeratorChildren: [{char: '1', type: 'char'}, {char: '0', type: 'char'}],
        denominatorChildren: [{char: '4', type: 'char'}],
        type: 'fraction'
      },
      {char: ' ', type: 'char'},
      {
        functionName: 'log',
        functionChildren: [
          {char: '8', type: 'char'},
          {char: '1', type: 'char'},
        ],
        argumentTerms: [{char: '9', type: 'char'}],
        type: 'function'
      },
      {char: ' ', type: 'char'},
      {
        rootChildren: [
          {char: '8', type: 'char'},
          {char: '1', type: 'char'},
        ],
        radicalTerms: [{char: '9', type: 'char'}],
        type: 'root'
      },
      {char: ' ', type: 'char'},
      {
        type: 'fraction',
        numeratorChildren: [
          {char: '1', type: 'char'}
        ],
        denominatorChildren: [
          {char: '8', type: 'char'},
        ]
      },
      {char: ' ', type: 'char'},
      {char: '8', type: 'char'},
      {
        exponentChildren: [
          {char: '2', type: 'char'},
        ],
        type: 'exponent'
      }
    )


  }
}
