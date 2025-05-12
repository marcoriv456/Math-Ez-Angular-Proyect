import {
  TermContainerComponent
} from "../../../../../../../../../../src/app/ui/features/input/ui/atoms/term-container/term-container.component";
import {ComponentFixture} from "@angular/core/testing";
import {Term} from "../../../../../../../../../../src/app/ui/features/input/core/models/terms/term.model";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputModule} from "../../../../../../../../../../src/app/ui/features/input/input.module";

describe('Term container: ', () => {
  let elementRef:HTMLElement
  let component:TermContainerComponent
  let fixture:ComponentFixture<TermContainerComponent>

  const setTerms = (...terms:Term[]) => {
    component.terms=terms
    fixture.detectChanges()
  }

  beforeEach(()=>{
    cy.mount(TermContainerComponent, {imports: [InputModule, BrowserAnimationsModule]}).then(response => {
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
