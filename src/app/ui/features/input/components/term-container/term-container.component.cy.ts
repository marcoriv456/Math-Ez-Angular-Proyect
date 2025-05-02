import {EditableTermContainerComponent} from "../editable-term-container/editable-term-container.component";
import {TermContainerComponent} from "./term-container.component";
import {CharComponent} from "../char/char.component";
import {FractionComponent} from "../fraction/fraction.component";
import {RootComponent} from "../root/root.component";
import {ExponentComponent} from "../exponent/exponent.component";
import {FunctionComponent} from "../function/function.component";
import {ParenthesisComponent} from "../parenthesis/parenthesis.component";
import {CommonModule} from "@angular/common";
import {CharClickedNotifierService} from "../../core/services/char-clicked-notifier/char-clicked-notifier.service";
import {WarningsService} from "../../core/services/warnings/warnings.service";
import {ComponentFixture} from "@angular/core/testing";
import {Term} from "../../core/models/terms/term.model";
import {InputTermDirective} from "../../directives/input-term/input-term.directive";
import {ContextHandlerService} from "../../core/services/context-handler/context-handler.service";
import {CaretHandlerService} from "../../core/services/caret-handler/caret-handler.service";
import {WritingHandlerService} from "../../core/services/wrting-handler/writing-handler.service";
import {CaretIndexService} from "../../core/services/caret-index/caret-index.service";
import {InputComponent} from "../../input.component";
import {CaretComponent} from "../caret/caret.component";
import {InputTermValidationDirective} from "../../directives/input-term-validation/input-term-validation.directive";
import {TermValidationWarningComponent} from "../term-validation-warning/term-validation-warning.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('Term container: ', () => {
  let elementRef:HTMLElement
  let component:TermContainerComponent
  let fixture:ComponentFixture<TermContainerComponent>

  const setTerms = (...terms:Term[]) => {
    component.terms=terms
    fixture.detectChanges()
  }

  beforeEach(()=>{
    cy.mount(TermContainerComponent,{
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
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule
      ],
      providers:[
        CharClickedNotifierService,
        WarningsService,
        ContextHandlerService,
        CaretHandlerService,
        WritingHandlerService,
        CaretIndexService,
        {provide:EditableTermContainerComponent, useValue:{}}
      ]
    }).then(response=>{
      fixture=response.fixture
      elementRef=fixture.elementRef.nativeElement
      component=response.component
      elementRef.style.height="5rem"
      response.fixture.componentRef.setInput('parent',{} as any)
      response.fixture.componentRef.setInput('terms',[])
    })
  })

  it('Displays characters: ', () => {
    setTerms(
      {type:'char',char:'h'},
      {type:'char',char:'e'},
      {type:'char',char:'l'},
      {type:'char',char:'l'},
      {type:'char',char:'o'},
    )

    cy.get("char").should("exist").and("be.visible")
    cy.wrap(elementRef).should("contain.text","hello")
  });

  it('Displays fractions', () => {
    setTerms({type: 'fraction', numeratorChildren: [], denominatorChildren: []})


    cy.get("frac").should("exist").and("be.visible")
  });

  it('Displays exponents', () => {
    setTerms({type:'exponent', exponentChildren:[]})

    cy.get("exp").should("exist").and("be.visible")
  })

  it('Displays roots', () => {
    setTerms({type:'root', rootChildren:[]})

    cy.get("root").should("exist").and("be.visible")
  });

  it('Displays functions', () => {
    setTerms({type:'function', functionName:"sen", functionChildren:[], argumentTerms:[]})

    cy.get("function").should("exist").and("be.visible")
  });

  it('Displays parenthesis', () => {
    setTerms({type:"parenthesis", parenthesisChildren:[]})

    cy.get("parenthesis").should("exist").and("be.visible")
  })
});
