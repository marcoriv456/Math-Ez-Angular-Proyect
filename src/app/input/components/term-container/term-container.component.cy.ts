import {TermContainerComponent} from "./term-container.component";
import {CharComponent} from "../char/char.component";
import {FractionComponent} from "../fraction/fraction.component";
import {RootComponent} from "../root/root.component";
import {ExponentComponent} from "../exponent/exponent.component";
import {FunctionComponent} from "../function/function.component";
import {ParenthesisComponent} from "../parenthesis/parenthesis.component";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CharClickedNotifierService} from "../../services/char-clicked-notifier/char-clicked-notifier.service";
import {WarningsService} from "../../services/warnings/warnings.service";
import {VariableProviderService} from "../../services/variable-provider/variable-provider.service";
import {ComponentFixture} from "@angular/core/testing";
import {Term} from "../../models/terms/term.model";
import {FractionChildComponent} from "../fraction/fraction-child/fraction-child.component";
import {TermArgumentComponent} from "../term-argument/term-argument.component";
import {EditableTermContainerComponent} from "../editable-term-container/editable-term-container.component";
import {InputTermDirective} from "../../directives/input-term/input-term.directive";

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
      declarations:[
        CharComponent,
        FractionComponent,
        FractionChildComponent,
        ExponentComponent,
        RootComponent,
        TermArgumentComponent,
        FunctionComponent,
        ParenthesisComponent,
        EditableTermContainerComponent,
        InputTermDirective
      ],
      imports:[
        CommonModule,
        BrowserAnimationsModule
      ],
      providers: [
        CharClickedNotifierService,
        WarningsService,
        VariableProviderService
      ]
    }).then(response=>{
      fixture=response.fixture
      elementRef=fixture.elementRef.nativeElement
      component=response.component
      elementRef.style.height="5rem"
      fixture.componentRef.setInput("parent",undefined)
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
