import {InputComponent} from "./input.component";
import {CharComponent} from "./components/char/char.component";
import {FractionComponent} from "./components/fraction/fraction.component";
import {InputTermDirective} from "./directives/input-term/input-term.directive";
import {ExponentComponent} from "./components/exponent/exponent.component";
import {RootComponent} from "./components/root/root.component";
import {FunctionComponent} from "./components/function/function.component";
import {TermContainerComponent} from "./components/term-container/term-container.component";
import {EditableTermContainerComponent} from "./components/editable-term-container/editable-term-container.component";
import {ParenthesisComponent} from "./components/parenthesis/parenthesis.component";
import {TermValidationWarningComponent} from "./components/term-validation-warning/term-validation-warning.component";
import {CommonModule} from "@angular/common";
import {CharClickedNotifierService} from "./services/char-clicked-notifier/char-clicked-notifier.service";
import {WarningsService} from "./services/warnings/warnings.service";
import {runEditableElementSuite} from "./tests/run-editable-element-tests-suite.helper";
import {clickAndType, expectCaretIsBehindOf, expectCaretIsInFrontOf} from "./tests/test-functions.util";
import {InputTermValidationDirective} from "./directives/input-term-validation/input-term-validation.directive";
import {CaretComponent} from "./components/caret/caret.component";
import {ContextHandlerService} from "./services/context-handler/context-handler.service";
import {CaretHandlerService} from "./services/caret-handler/caret-handler.service";
import {WritingHandlerService} from "./services/wrting-handler/writing-handler.service";
import {CaretIndexService} from "./services/caret-index/caret-index.service";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import Chainable = Cypress.Chainable;
import {
  expSelector,
  fracDenominatorSelector,
  fracNumeratorSelector,
  functionSelector,
  rootIndexSelector, rootRadicandSelector
} from "./tests/test-selectors.util";

describe(`Input component`, () => {
  let view: Chainable<JQuery<HTMLElement>>;
  let component: InputComponent


  beforeEach(() => {
    cy.mount(InputComponent, {
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
        CaretIndexService
      ]
    })
      .then((response) => {
        component = response.component
        view = cy.wrap(response.fixture.elementRef.nativeElement)
      })
  })

  describe(`Component focusing:`, () => {

    it(`Focuses on click`, () => {
      view.click()

      cy.focused().then(el => {
        view.should(`eql`, el)
      })
    });
  });

  describe(`Placeholder behavior:`, () => {
    it(`Shows the advice if there are no written characters`, () => {
      cy.get(`char`).should(`not.exist`)
      cy.get(`.insert-something-advice`).should(`exist`)
    });

    it(`Removes the advice it the user writes a character`, () => {
      view.type(`hello`)

      cy.wait(100)
      cy.get(`.insert-something-advice`).should(`not.exist`)
    });
  });

  describe('Term validation:', () => {
    const expectValid = (selector:string) => {
      cy.get(selector)
        .should('not.have.class','partially-invalid')
        .should('not.have.class','fully-invalid')
    }

    const expectPartiallyInvalid = (selector:string) => {
      cy.get(selector).should('have.class','partially-invalid')
    }

    const expectFullyInvalid = (selector:string) => {
      cy.get(selector).should('have.class','fully-invalid')
    }

    const expectWarningToBeDisplayed = (invalidElementSelector:string) => {
      cy.get(invalidElementSelector)
        .trigger('mouseover')

      cy.get('.warning-container')
        .should('exist').and('be.visible')
    }

    describe('In characters:', () => {
      it('Invalidates a character if it is no declared as a variable', () => {
        view.type('F')

        expectFullyInvalid('char')
        expectWarningToBeDisplayed('char')
      });

      it('Not invalidates a character if it is declared as a variable', () => {
        view.type('eπ')

        expectValid('char')
      });

      it('Not invalidates aa character if it is a number', () => {
        view.type('12345678')

        expectValid('char')
      });

      it('Not invalidates a character if it is an operand', () => {
        view.type('+-*=')

        expectValid('char')
      });

    });

    describe('In fractions:', () => {
      beforeEach(()=>{
        view.type('/')
      })

      it('Invalidates 0/0 indetermination', () => {
        clickAndType(fracNumeratorSelector,'0')
        clickAndType(fracDenominatorSelector,'0')

        expectFullyInvalid('frac')
        expectWarningToBeDisplayed('frac')
      });

      it('Partially invalidates 0 as numerator', () => {
        clickAndType(fracNumeratorSelector,'0')

        expectPartiallyInvalid(fracNumeratorSelector)
        expectWarningToBeDisplayed(fracNumeratorSelector)
      });

      it('Invalidates 0 as denominator ', () => {
        clickAndType(fracDenominatorSelector,'0')

        expectFullyInvalid(fracDenominatorSelector)
        expectWarningToBeDisplayed(fracDenominatorSelector)
      });
    });

    describe('In roots: ', () => {
      beforeEach(()=>{
        view.type('{alt}r')
      })

      it('Invalidates negative radicand and odd index', () => {
        clickAndType(rootIndexSelector,'4')
        clickAndType(rootRadicandSelector,'-10')

        expectFullyInvalid('root')
        expectWarningToBeDisplayed('root')
      });

      it('Not invalidates negative radicand if index is not odd', () => {
        clickAndType(rootIndexSelector,'3')
        clickAndType(rootRadicandSelector,'-10')

        expectValid('root')
      });

      it('Partially invalidates 1 as radicand value', () => {
        clickAndType(rootRadicandSelector,'1')

        expectPartiallyInvalid('root')
        expectWarningToBeDisplayed('root')
      });

      it('Invalidates 1 as index value', () => {
        clickAndType(rootIndexSelector, '1')

        expectFullyInvalid('root')
        expectWarningToBeDisplayed('root')
      });

      it('Invalidates 0 as index value', () => {
        clickAndType(rootIndexSelector, '0')

        expectFullyInvalid('root')
        expectWarningToBeDisplayed('root')
      });

    });

    describe('In exponents: ', () => {
      beforeEach(()=>{
        view.type('{ctrl}e')
      })

      afterEach(()=>{
        expectWarningToBeDisplayed(expSelector)
      })

      it('Partially invalidates 1 as exponent', () => {
        clickAndType(expSelector,'1')

        expectPartiallyInvalid(expSelector)
      });

      it('Partially invalidates 0 as exponent', () => {
        clickAndType(expSelector,'0')

        expectPartiallyInvalid(expSelector)
      });

    });

    describe('In logarithms:', () => {
      beforeEach(()=>{
        view.type('log')
      })

      afterEach(()=>{
        expectWarningToBeDisplayed(functionSelector)
      })

      const baseSelector='function editable-term-container:first-of-type'
      const argumentSelector='function editable-term-container:last-of-type'

      it('Partially invalidates 10 as base', () => {
        clickAndType(baseSelector,'10')

        expectPartiallyInvalid(functionSelector)
      });

      it('Invalidates 1 as base', () => {
        clickAndType(baseSelector,'1')

        expectFullyInvalid(functionSelector)
      });

      it('Invalidates 0 as base', () => {
        clickAndType(baseSelector,'0')

        expectFullyInvalid(functionSelector)
      });

      it('Invalidates negative numbers as base', () => {
        clickAndType(baseSelector,'-1')

        expectFullyInvalid(functionSelector)
      });

      it('Invalidates 0 as argument', () => {
        clickAndType(argumentSelector,'0')

        expectFullyInvalid(functionSelector)
      });

      it('Invalidates negative arguments', () => {
        clickAndType(argumentSelector,'-1')

        expectFullyInvalid(functionSelector)
      });
    });

  });

  describe('Caret positioning on clicks:', () => {
    beforeEach(()=>{
      view.type('a')
    })

    it('Moves the caret next to the character', () => {
      cy.get('char').then(el=>{
        const width=el.width()||0
        cy.get('char').click((width/2)+5,0)
      })

      expectCaretIsInFrontOf('char')
    });

    it('Moves the caret behind the character', () => {
      cy.get('char').then(el=>{
        const width=el.width()||0
        cy.get('char').click((width/2)-5,0)
      })

      expectCaretIsBehindOf('char')
    });
  });

  describe('Auto scrolling when caret is not visible', () => {
    it('Scrolls the component to the right', () => {
      view.type('wwwwwwwwwwwwwwwwwwwwwwwwwww')

      cy.wait(500)

      cy.get('[data-cy-root] .main-overlay')
        .then(elements=>elements[0].scrollLeft)
        .should('be.closeTo',100,10)
    });

    it('Scrolls the component to the left', () => {
      view.type('wwwwwwwwwwwwwwwwwwwwwwwwwww').type('{Home}')

      cy.wait(500)

      cy.get('[data-cy-root] .main-overlay')
        .then(elements=>elements[0].scrollLeft)
        .should('be.closeTo',0,10)
    });
  });

  runEditableElementSuite(`Main`, `{ctrl}`, `[data-cy-root] editable-term-container`)
});
