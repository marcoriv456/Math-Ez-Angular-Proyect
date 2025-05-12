
import {
  EditableTermContainerComponent
} from "../../../../../../../../../../src/app/ui/features/input/ui/molecules/editable-term-container/editable-term-container.component";
import {CharComponent} from "../../../../../../../../../../src/app/ui/features/input/ui/terms/char/char.component";
import {
  TermContainerComponent
} from "../../../../../../../../../../src/app/ui/features/input/ui/atoms/term-container/term-container.component";
import {ComponentFixture} from "@angular/core/testing";
import {Term} from "../../../../../../../../../../src/app/ui/features/input/core/models/terms/term.model";
import {InputComponent} from "../../../../../../../../../../src/app/ui/features/input/input.component";
import {
  FractionComponent
} from "../../../../../../../../../../src/app/ui/features/input/ui/terms/fraction/fraction.component";
import {
  InputTermDirective
} from "../../../../../../../../../../src/app/ui/features/input/ui/directives/input-term/input-term.directive";
import {
  ExponentComponent
} from "../../../../../../../../../../src/app/ui/features/input/ui/terms/exponent/exponent.component";
import {RootComponent} from "../../../../../../../../../../src/app/ui/features/input/ui/terms/root/root.component";
import {
  FunctionComponent
} from "../../../../../../../../../../src/app/ui/features/input/ui/terms/function/function.component";
import {
  ParenthesisComponent
} from "../../../../../../../../../../src/app/ui/features/input/ui/terms/parenthesis/parenthesis.component";
import {
  TermValidationWarningComponent
} from "../../../../../../../../../../src/app/ui/features/input/ui/organisms/term-validation-warning/term-validation-warning.component";
import {
  InputTermValidationDirective
} from "../../../../../../../../../../src/app/ui/features/input/ui/directives/input-term-validation/input-term-validation.directive";
import {
  CaretComponent
} from "../../../../../../../../../../src/app/ui/features/input/ui/organisms/caret/caret.component";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  InputEventBusService
} from "../../../../../../../../../../src/app/ui/features/input/core/services/input-event-bus/input-event-bus.service";
import {
  ContextHandlerService
} from "../../../../../../../../../../src/app/ui/features/input/core/services/context-handler/context-handler.service";
import {
  CaretHandlerService
} from "../../../../../../../../../../src/app/ui/features/input/core/services/caret-handler/caret-handler.service";
import {
  WritingHandlerService
} from "../../../../../../../../../../src/app/ui/features/input/core/services/wrting-handler/writing-handler.service";
import {
  CaretIndexService
} from "../../../../../../../../../../src/app/ui/features/input/core/services/caret-index/caret-index.service";

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
        InputEventBusService,
        ContextHandlerService,
        CaretHandlerService,
        WritingHandlerService,
        CaretIndexService,
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
