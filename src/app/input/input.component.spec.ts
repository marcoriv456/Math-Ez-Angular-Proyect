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
import {inject} from "@angular/core";

fdescribe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  let variableProvider = new ExperimentalVariableProviderService()
  let variableProviderContainer: VariableProviderService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
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

    })
      .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    fixture.componentRef.setInput('variableProvider', variableProvider)

    variableProviderContainer = TestBed.inject(VariableProviderService)
    spyOn(variableProviderContainer, 'setVariableProvider').and.callThrough()

    component = fixture.componentInstance;

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
      expect(variableProviderContainer.setVariableProvider).toHaveBeenCalled()
    });
  })
  //--------------------- INITIALIZATION TESTS---------------------

  //--------------------- USER INTERACTION TESTS---------------------
  describe('User interactions', () => {
    const dispatchEvents = (...events: KeyboardEvent[]) => {
      events.forEach(event => component.ref.dispatchEvent(event))
    }

    const pressKeys = (...keys: string[]) => {
      dispatchEvents(...keys.map(key => new KeyboardEvent('keydown', {key})))
    }

    const expectTerms = (...expectedTerms: Term[]) => {
      expect(component.getTerms()).toEqual(expectedTerms)
    }

    it('should lost focus when tab key is clicked', () => {
      pressKeys('Tab')

      expect(document.activeElement).not.toEqual(component.ref)
    });

    describe('Character adding on user interaction', () => {
      describe('simple character adding', () => {

        it("should add a character, when the keydown event is triggered and the key's length is equal to 1", () => {
          pressKeys('a')

          expectTerms({type: 'char', char: 'a'})
        })

        it('when multiple character keys are pressed, then it should add multiple characters', () => {
          pressKeys(..."hello")

          expectTerms(
            {type: 'char', char: 'h'},
            {type: 'char', char: 'e'},
            {type: 'char', char: 'l'},
            {type: 'char', char: 'l'},
            {type: 'char', char: 'o'},
          )
        });
      })
    })
    //--------------------- USER INTERACTION TESTS---------------------


  })
})
