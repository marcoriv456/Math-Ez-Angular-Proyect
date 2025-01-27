import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import {InputTestingEnvironmentComponent} from "./input-testing-environment/input-testing-environment.component";
import {CharComponent} from "./components/char/char.component";
import {FractionComponent} from "./components/fraction/fraction.component";
import {InputTermDirective} from "./directives/input-term/input-term.directive";
import {FractionChildComponent} from "./components/fraction/fraction-child/fraction-child.component";
import {ExponentComponent} from "./components/exponent/exponent.component";
import {RootComponent} from "./components/root/root.component";
import {FunctionComponent} from "./components/function/function.component";
import {TermContainerComponent} from "./components/term-container/term-container.component";
import {TermArgumentComponent} from "./components/term-argument/term-argument.component";
import {EditableTermContainerComponent} from "./components/editable-term-container/editable-term-container.component";
import {ParenthesisComponent} from "./components/parenthesis/parenthesis.component";
import {TermValidationWarningComponent} from "./components/term-validation-warning/term-validation-warning.component";
import {CommonModule} from "@angular/common";
import {CharClickedNotifierService} from "./services/char-clicked-notifier/char-clicked-notifier.service";
import {WarningsService} from "./services/warnings/warnings.service";
import {VariableProviderService} from "./services/variable-provider/variable-provider.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Term} from "./models/terms/term.model";
import {VariableProvider} from "./models/variable-provider.model";
import {ExperimentalVariableProviderService} from "./input-testing-environment/experimental-variable-provider.service";
import {inject, input} from "@angular/core";
import {SpecialCharFinder} from "./classes/special-char-finder/special-char-finder.class";
import {configureTestbed} from "./tests/config/configure-testbed.helper";

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  let variableProvider = new ExperimentalVariableProviderService()
  let variableProviderContainer: VariableProviderService;

  beforeEach(async () => {
    let {_component,_fixture}=await configureTestbed(InputComponent)

    component=_component
    fixture=_fixture

    fixture.componentRef.setInput('variableProvider', variableProvider)
    variableProviderContainer = TestBed.inject(VariableProviderService)
    fixture.detectChanges();
  });

  //--------------------- INITIALIZATION TESTS---------------------
  describe('Component initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should init variable provider object', () => {
      expect(component.variableProvider).toBeTruthy()
    })

    it('should set the variable provider in the container service', () => {
      expect(variableProviderContainer.variableProvider).toBeTruthy()
    });
  })
  //--------------------- INITIALIZATION TESTS---------------------

  //--------------------- USER INTERACTION TESTS---------------------
  describe('User interactions', () => {
    const dispatchEvents = (...events: Event[]) => {
      events.forEach(event => component.ref.dispatchEvent(event))
    }

    const pressKeys = (...keys: string[]) => {
      dispatchEvents(...keys.map(key => new KeyboardEvent('keydown', {key})))
    }

    it('should lost focus when tab key is clicked', () => {
      pressKeys('Tab')

      expect(document.activeElement).not.toEqual(component.ref)
    });

    //--------------------- USER INTERACTION TESTS---------------------
  })
})
