import {InputComponent} from "./input.component";
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
import Chainable = Cypress.Chainable;
import {ComponentFixture} from "@angular/core/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxParticlesModule} from "@tsparticles/angular";


describe('Input component', () => {
  let view: Chainable<JQuery<HTMLElement>>;
  let component: InputComponent

  const runEditableElementSuite = (name: string, addingCommand: string, focusingElementSelector: string) => {
    describe(`Char adding inside "${name}" editable element:`, () => {
      beforeEach(() => {
        view.type(addingCommand)
        cy.get(focusingElementSelector).click()
      })

      it('Adds letters: ', () => {

        view.type('hello world')

        cy.log('written')

        cy.contains(focusingElementSelector, 'hello world').should('exist')
      });

      it('Adds a fraction', () => {
        view.type('/')

        cy.get(`${focusingElementSelector} frac`).should('exist').and('be.visible')
      });

      it('Adds a simple root', () => {
        view.type('{ctrl}r')

        cy.get(`${focusingElementSelector} root`).should('exist').and('be.visible')
      });

      it('Adds an editable index root', () => {
        view.type('{alt}r')

        cy.get(`${focusingElementSelector} root:has(argument)`).should('exist')
      });

      it('Adds an exponent', () => {
        view.type('{ctrl}e')

        cy.get(`${focusingElementSelector} exp`).should('exist').and('be.visible')
      });

      it('Adds a parenthesis', () => {
        view.type('()')

        cy.get(`${focusingElementSelector} parenthesis`).should('exist').and('be.visible')
      });
    })
  }

  beforeEach(() => {
    cy.mount(InputComponent, {
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
      ]
    })
      .then((response) => {
        component = response.component
        view = cy.wrap(response.fixture.elementRef.nativeElement)
      })
  })

  describe('Component focusing:', () => {

    it('Focuses on click', () => {
      view.click()

      cy.focused().then(el => {
        view.should('eql', el)
      })
    });

    it('Shows the caret when focused', () => {
      view.click()

      cy.wait(50)
      cy.get('#caret-container span').should('be.visible')
    })
  });

  describe('Placeholder behavior:', () => {
    it('Shows the advice if there are no written characters', () => {
      cy.get('char').should('not.exist')
      cy.get('.insert-something-advice').should('exist')
    });

    it('Removes the advice it the user writes a character', () => {
      view.type('hello')

      cy.wait(100)
      cy.get('.insert-something-advice').should('not.exist')
    });
  });

  describe('Term adding in all contexts: ', () => {
    runEditableElementSuite('Input Base', '{ctrl}', '[data-cy-root]')
    runEditableElementSuite('Exponent', '{ctrl}e', 'exp')
    runEditableElementSuite('Fraction numerator', '/', 'frac frac-child[type="numerator"]')
    runEditableElementSuite('Fraction denominator', '/', 'frac frac-child[type="denominator"]')
    runEditableElementSuite('Root', '{ctrl}r', 'root editable-term-container')
    runEditableElementSuite('Root index editor', '{alt}r', 'root argument')
    runEditableElementSuite('Parenthesis', '()', 'parenthesis')
  })

  describe('Term autocompletion: ', () => {
    describe('Fraction autocompletion:  ', () => {
      beforeEach(() => {
        view.type('helloworld')
      })

      it('Placing the caret in the middle of a group of characters, it autocompletes the denominator and numerator with those characters', () => {
        cy.contains('w').click()
        view.type('/')

        cy.get('frac-child[type="numerator"]').should('have.text', 'hello')
        cy.get('frac-child[type="denominator"]').should('have.text', 'world').and('have.class', 'selected')
      });

      it('Placing the caret next to a group of characters, it autocompletes the numerator with those characters', () => {
        view.type('{ctrl}{End}')

        view.type('/')

        cy.get('frac-child[type="numerator"]').should('have.text', 'helloworld')
        cy.get('frac-child[type="denominator"]').should('not.have.text').and('have.class', 'selected')
      });

      it('Placing the caret behind a gruop of characters, it autocompletes the denominator with those characters', () => {
        view.type('{ctrl}{Home}')

        view.type('/')

        cy.get('frac-child[type="numerator"]').should('not.have.text').and('have.class', 'selected')
        cy.get('frac-child[type="denominator"]').should('have.text', 'helloworld')
      });

    });
    describe('Parenthesis autocompletion: ', () => {

      it('When the parenthesis gets closed, it wraps the existing text into the two parenthesis', () => {
        view.type('(hello world')

        view.type(')')

        cy.get('parenthesis term-container').should('have.text', 'hello world')
      });

      it('When theres a closing parenthesis and an opening parenthesis is added, it wraps the existing text into the two parenthesis', () => {
        view.type('hello world)')
        view.type('{ctrl}{Home}')

        view.type('(')

        cy.get('parenthesis term-container').should('have.text', 'hello world')
        cy.get('parenthesis').should('have.class', 'selected')
      });


      it('Looks for the closest opening parenthesis to wrap the text', () => {
        view.type('(((hello world')

        view.type(')')

        view.should('have.text', '(((hello world)')
        cy.get('parenthesis term-container').should('have.text', 'hello world')
      });

      it('Looks for the closest closing parenthesis to wrap the text', () => {
        view.type('hello world)))')
        view.type('{ctrl}{Home}')

        view.type('(')

        view.should('have.text', '(hello world)))')
        cy.get('parenthesis term-container').should('have.text', 'hello world')
        cy.get('parenthesis').should('have.class', 'selected')
      });

    })
  });
});


