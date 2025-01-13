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

      describe('Fraction adding', () => {
        const addSlash = () => pressKeys('/')


        it('having no elements written already, when a "/" char is typed, should add an empty fraction', () => {
          addSlash()

          expectTerms({type: 'fraction', denominatorChildren: [], numeratorChildren: []})
        });

        it('having some elements added already and the caret placed in front of them, when a "/" character is typed. should add a fraction with a filled numerator', () => {
          pressKeys(...'num')

          addSlash()

          expectTerms({
            type: 'fraction',
            numeratorChildren: [
              {type: 'char', char: 'n'},
              {type: 'char', char: 'u'},
              {type: 'char', char: 'm'},
            ],
            denominatorChildren: [],
          })
        });

        it('having some elements in already and the caret placed before them, when the "/" character is typed, then it should add a fraction with a filled denominator ', () => {
          pressKeys(...'den', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft',)

          addSlash()

          expectTerms({
            type: "fraction",
            numeratorChildren: [],
            denominatorChildren: [
              {type: "char", char: 'd'},
              {type: "char", char: 'e'},
              {type: "char", char: 'n'},
            ]
          });
        })

        it('having some elements in already and the caret placed in the middle of them, when the "/" character is , then it should add a full filed fraction', () => {
          pressKeys(...'num',...'den', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft')

          addSlash()

          expectTerms({
            type: "fraction",
            numeratorChildren: [
              {type: "char", char: 'n'},
              {type: "char", char: 'u'},
              {type: "char", char: 'm'},
            ],
            denominatorChildren: [
              {type: "char", char: 'd'},
              {type: "char", char: 'e'},
              {type: "char", char: 'n'},
            ]
          })
        });
      })

      describe('Exponent adding', ()=>{
        const pressExponentShortcut = ()=>{
          dispatchEvents(new KeyboardEvent('keydown', {key:'e', ctrlKey:true}))
        }

        it('when the user presses the exponent shortcut, it should add an exponent', () => {
          pressExponentShortcut()

          expectTerms({type:'exponent', exponentChildren:[]})
        });

        it('given a recently added exponent,when the user doesnt moves to anywhere else, it should add some terms inside the exponent', () => {
          pressExponentShortcut()

          pressKeys(...'hello')

          expectTerms({
            type:'exponent',
            exponentChildren:[
              {type:'char',char:'h'},
              {type:'char',char:'e'},
              {type:'char',char:'l'},
              {type:'char',char:'l'},
              {type:'char',char:'o'}
            ]
          })
        });
      })
    })
    //--------------------- USER INTERACTION TESTS---------------------


  })
})
