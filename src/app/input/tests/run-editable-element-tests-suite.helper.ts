import {InputComponent} from "../input.component";
import {InputTestingEnvironmentComponent} from "../input-testing-environment/input-testing-environment.component";
import {CharComponent} from "../components/char/char.component";
import {FractionComponent} from "../components/fraction/fraction.component";
import {InputTermDirective} from "../directives/input-term/input-term.directive";
import {FractionChildComponent} from "../components/fraction/fraction-child/fraction-child.component";
import {ExponentComponent} from "../components/exponent/exponent.component";
import {RootComponent} from "../components/root/root.component";
import {FunctionComponent} from "../components/function/function.component";
import {TermContainerComponent} from "../components/term-container/term-container.component";
import {TermArgumentComponent} from "../components/term-argument/term-argument.component";
import {EditableTermContainerComponent} from "../components/editable-term-container/editable-term-container.component";
import {ParenthesisComponent} from "../components/parenthesis/parenthesis.component";
import {TermValidationWarningComponent} from "../components/term-validation-warning/term-validation-warning.component";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CharClickedNotifierService} from "../services/char-clicked-notifier/char-clicked-notifier.service";
import {WarningsService} from "../services/warnings/warnings.service";
import {VariableProviderService} from "../services/variable-provider/variable-provider.service";
import Chainable = Cypress.Chainable;
import {
  clickAndType,
  expectContexted,
  expectCaretIsBehindOf,
  expectCaretIsInFrontOf,
  contextParent,
  expectCaretIsBehindOfLetter,
  expectCaretIsInFrontOfLetter,
  selectView,
  getCaretPosition
} from "./test-functions.util";

export const runEditableElementSuite = (name: string, addingCommand: string, focusingElementSelector: string) => {
  let view: Chainable<JQuery<HTMLElement>>;
  let component: InputComponent

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

  describe(`Editable element tests in "${name}" editable element:`, () => {

    describe(`Term adding in ${name}:`, () => {

      beforeEach(() => {
        view.type(addingCommand)
        cy.get(focusingElementSelector).click()
      })

      it(`Adds letters: `, () => {

        view.type(`hello world`)

        cy.log(`written`)

        cy.contains(focusingElementSelector, `hello world`).should(`exist`)
      });

      it(`Adds a fraction`, () => {
        view.type(`/`)

        cy.get(`${focusingElementSelector} frac`).should(`exist`).and(`be.visible`)
      });

      it(`Adds a simple root`, () => {
        view.type(`{ctrl}r`)

        cy.get(`${focusingElementSelector} root`).should(`exist`).and(`be.visible`)
      });

      it(`Adds an editable index root`, () => {
        view.type(`{alt}r`)

        cy.get(`${focusingElementSelector} root:has(argument)`).should(`exist`)
      });

      it(`Adds an exponent`, () => {
        view.type(`{ctrl}e`)

        cy.get(`${focusingElementSelector} exp`).should(`exist`).and(`be.visible`)
      });

      it(`Adds a parenthesis`, () => {
        view.type(`()`)

        cy.get(`${focusingElementSelector} parenthesis`).should(`exist`).and(`be.visible`)
      });

      it(`Adds a sen function`, () => {
        view.type(`sen`)

        cy.get(`${focusingElementSelector} function`).should(`exist`).and(`be.visible`).and(`contain.text`, `sen`)
      });

      it(`Adds a cos function`, () => {
        view.type(`cos`)

        cy.get(`${focusingElementSelector} function`).should(`exist`).and(`be.visible`).and(`contain.text`, `cos`)
      });

      it(`Adds a tan function`, () => {
        view.type(`tan`)

        cy.get(`${focusingElementSelector} function`).should(`exist`).and(`be.visible`).and(`contain.text`, `tan`)
      });

      it(`Adds a log function`, () => {
        view.type(`log`)

        cy.get(`${focusingElementSelector} function`).should(`exist`).and(`be.visible`).and(`contain.text`, `log`)
      });

      it(`Adds a ln function`, () => {
        view.type(`ln`)

        cy.get(`${focusingElementSelector} function`).should(`exist`).and(`be.visible`).and(`contain.text`, `ln`)
      });

    })

    describe(`Term deleting in ${name}:`, () => {
      beforeEach(() => {
        view.type(addingCommand)
        cy.get(focusingElementSelector).click()
        selectView()
      })

      describe('Character removal: ', () => {
        it('Removes chars', () => {
          view.type('shop')

          view.type('{Backspace}')

          cy.contains('char','p').should('not.exist')
          cy.get(focusingElementSelector)
            .should('contain.text','sho')
            .and('not.contain.text','shop')
          expectCaretIsInFrontOfLetter('o')
        });
      });

      describe('Fraction removal: ', () => {
        beforeEach(()=>{
          view.type('12/34')
          view.type('{RightArrow}')
        })

        it('Removes the whole fraction', () => {
          view.type('{End}')

          view.type('{Backspace}')

          cy.get('frac').should('not.exist')
          expectCaretIsBehindOf(focusingElementSelector)
        });

        it('Removes the fraction but the content stays there and the caret moves next to the numerator content', () => {
          cy.get(`${focusingElementSelector} frac frac-child[type="denominator"]`).click()
          selectView().type('{Home}')

          view.type('{Backspace}')

          cy.get(focusingElementSelector).should('contain.text','1234')
          expectCaretIsInFrontOfLetter('2')
        });

        it('Removes the fraction but the content stays there and the caret moves to the beginning', () => {
          cy.get(`${focusingElementSelector} frac frac-child[type="numerator"]`).click()
          selectView().type('{Home}')

          view.type('{Backspace}')

          cy.get(focusingElementSelector).should('contain.text','1234')
          expectCaretIsBehindOfLetter('1')
        });

      });

      describe('Exponent removal: ', () => {
        beforeEach(()=>{
          view.type('{ctrl}e').type('1234')
        })

        it('Remove the whole exponent', () => {
          view.type('{RightArrow}')

          view.type('{Backspace}')

          cy.get(focusingElementSelector).should('not.contain.text','1234')
          cy.get(`${focusingElementSelector} exp`).should('not.exist')
          expectCaretIsBehindOf(focusingElementSelector)
        });

        it('Removes the exponent but the terms remain there', () => {
          view.type('{Home}')

          view.type('{Backspace}')

          cy.get(focusingElementSelector).should('contain.text','1234')
          cy.get(`${focusingElementSelector} exp`).should('not.exist')
          expectCaretIsBehindOfLetter('1')
        })
      });

      describe('Root removal', () => {
        beforeEach(()=>{
          view.type('{alt}r')
          clickAndType(`${focusingElementSelector} root argument`,'1234')
          clickAndType(`${focusingElementSelector} root editable-term-container`,'5678')
          view.type('{RightArrow}')
        })

        it('Removes the whole root', () => {
          view.type('{End}')

          view.type('{Backspace}')

          cy.get(`${focusingElementSelector} root`).should('not.exist')
        });

        it('Removes the root, but the radicand terms still being there ', () => {
          clickAndType(`${focusingElementSelector} root editable-term-container`,'{Home}')

          view.type('{Backspace}')

          cy.get(`${focusingElementSelector} root`).should('not.exist')
          cy.get(focusingElementSelector).should('contain.text','5678')
          cy.get(focusingElementSelector).should('not.contain.text','1234')
        });

        it('Removes the root, but the index terms still being there', () => {
          clickAndType(`${focusingElementSelector} root argument`,'{Home}')

          view.type('{Backspace}')

          cy.get(`${focusingElementSelector} root`).should('not.exist')
          cy.get(focusingElementSelector).should('contain.text','1234')
          cy.get(focusingElementSelector).should('not.contain.text','5678')
        });
      });

      describe('Function removal: ', () => {
        beforeEach(()=>{
          view.type('log')
          clickAndType(`${focusingElementSelector} function argument`,'1234')
          clickAndType(`${focusingElementSelector} function editable-term-container`,'5678')
          selectView().type('{RightArrow}')
        })

        it('Removes the whole function', () => {
          view.type('{End}')

          view.type('{Backspace}')

          cy.get(`${focusingElementSelector} function`).should('not.exist')
          expectCaretIsBehindOf(focusingElementSelector)
        });

        it('Removes the function, but the main terms remain there', () => {
          clickAndType(`${focusingElementSelector} function editable-term-container`,'{Home}')

          view.type('{Backspace}')

          cy.get(focusingElementSelector).should('contain.text','5678')
          cy.get(`${focusingElementSelector} function`).should('not.exist')
          expectCaretIsBehindOfLetter('5')
        });

        it('Removes the function, but the base elements remain there', () => {
          clickAndType(`${focusingElementSelector} function argument`, '{Home}')

          view.type('{Backspace}')

          cy.get(focusingElementSelector).should('contain.text','1234')
          cy.get(`${focusingElementSelector} function`).should('not.exist')
          expectCaretIsBehindOfLetter('1')
        });
      });

      describe('Parenthesis removal', ()=>{
        beforeEach(()=>{
          view.type('(1234)')
        })

        it('Removes the component, but the elements and opening parenthesis remains there', () => {
          view.type('{End}')

          view.type('{Backspace}')

          cy.get(focusingElementSelector).should('contain.text','(1234')
          cy.get(`${focusingElementSelector} parenthesis`).should('not.exist')
          expectCaretIsInFrontOfLetter('4')
        });

        it('Removes the component, but just the elements remain there', () => {
          view.type('{LeftArrow}').type('{Home}')

          view.type('{Backspace}')

          cy.get(focusingElementSelector).should('contain.text','1234')
          cy.get(`${focusingElementSelector} parenthesis`).should('not.exist')
          expectCaretIsBehindOf(`${focusingElementSelector} char:first-child`)
        });
      })
    });

    describe(`Term autocompletion: in ${name}:`, () => {
      beforeEach(()=>{
        view.type(addingCommand)
        cy.get(focusingElementSelector).click()
        selectView().type(`{Home}`)
      })
      describe(`Fraction autocompletion:  `, () => {
        beforeEach(() => {
          view.type(`helloworld`)
        })

        it(`Placing the caret in the middle of a group of characters, it autocompletes the denominator and numerator with those characters`, () => {
          view.type('{LeftArrow}')
            .type('{LeftArrow}')
            .type('{LeftArrow}')
            .type('{LeftArrow}')
            .type('{LeftArrow}')

          view.type(`/`)

          cy.get(`${focusingElementSelector} frac-child[type="numerator"]`).should(`have.text`, `hello`)
          cy.get(`${focusingElementSelector} frac-child[type="denominator"]`).should(`have.text`, `world`).and(`have.class`, `selected`)
        });

        it(`Placing the caret next to a group of characters, it autocompletes the numerator with those characters`, () => {
          view.type(`{End}`)

          view.type(`/`)

          cy.get(`${focusingElementSelector} frac-child[type="numerator"]`).should(`have.text`, `helloworld`)
          cy.get(`${focusingElementSelector} frac-child[type="denominator"]`).should(`not.have.text`).and(`have.class`, `selected`)
        });

        it(`Placing the caret behind a gruop of characters, it autocompletes the denominator with those characters`, () => {
          view.type(`{Home}`)

          view.type(`/`)

          cy.get(`${focusingElementSelector} frac-child[type="numerator"]`).should(`not.have.text`).and(`have.class`, `selected`)
          cy.get(`${focusingElementSelector} frac-child[type="denominator"]`).should(`have.text`, `helloworld`)
        });

      });
      describe(`Parenthesis autocompletion: `, () => {

        it(`When the parenthesis gets closed, it wraps the existing text into the two parenthesis`, () => {
          view.type(`(hello world`)

          view.type(`)`)

          cy.get(`${focusingElementSelector} parenthesis term-container`).should(`have.text`, `hello world`)
        });

        it(`When theres a closing parenthesis and an opening parenthesis is added, it wraps the existing text into the two parenthesis`, () => {
          view.type(`hello world)`)
          view.type(`{Home}`)

          view.type(`(`)

          cy.get(`${focusingElementSelector} parenthesis term-container`).should(`have.text`, `hello world`)
          cy.get(`${focusingElementSelector} parenthesis`).should(`have.class`, `selected`)
        });


        it(`Looks for the closest opening parenthesis to wrap the text`, () => {
          view.type(`(((hello world`)

          view.type(`)`)

          // cy.get(focusingElementSelector).should(`have.text`, `(((hello world)`)
          cy.get(`${focusingElementSelector} parenthesis term-container`).should(`contain.text`, `hello world`)
        });

        it(`Looks for the closest closing parenthesis to wrap the text`, () => {
          view.type(`hello world)))`)
          view.type(`{Home}`)

          view.type(`(`)

          // cy.get(focusingElementSelector).should(`have.text`, `(hello world)))`)
          cy.get(`${focusingElementSelector} parenthesis term-container`).should(`contain.text`, `hello world`)
          cy.get(`${focusingElementSelector} parenthesis`).should(`have.class`, `selected`)
        });

      })
      describe(`Function autocompletion`, () => {
        beforeEach(() => {
          view.type(`(hello)`)
        })

        it(`When a function is added behind a parenthesis, the function wraps the parenthesis terms as its arguments`, () => {
          view.type(`{Home}`)

          view.type(`sen`)

          cy.get(`${focusingElementSelector} parenthesis`).should(`not.exist`)
          cy.contains(`${focusingElementSelector} function`, `sen(hello)`).should(`exist`)
          cy.contains(`${focusingElementSelector} function>editable-term-container`, `hello`).should(`exist`)
        });

        it(`When an editable base function is added behind a parenthesis, the function wraps the parenthesis terms as its arguments`, () => {
          view.type(`{Home}`)

          view.type(`log`)

          cy.get(`${focusingElementSelector} parenthesis`).should(`not.exist`)
          cy.contains(`${focusingElementSelector} function`, `log(hello)`).should(`exist`)
          cy.contains(`${focusingElementSelector} function>editable-term-container`, `hello`).should(`exist`)

        });
      });
    });

    describe(`Shortcuts in ${name}: `, () => {
      beforeEach(()=>{
        view.type(addingCommand)
        cy.get(focusingElementSelector).click({force:true})
        selectView().type(`{Home}`)
      })

      describe(`Arrow keys`, () => {
        beforeEach(() => {
          // view.click()
          view.type(`hello world`)
        })

        it(`The caret moves to the next element when the Right Arrow is pressed`, () => {
          view.type(`{Home}`)

          view.type(`{RightArrow}`)

          expectCaretIsInFrontOf(`${focusingElementSelector} char:first-child`)
        });

        it(`The caret moves to the previous element when the Left Arrow is pressed`, () => {
          view.type(`{LeftArrow}`)

          expectCaretIsBehindOf(`${focusingElementSelector} char:last-child`)
        });
      });
      describe(`Backspace key`, () => {
        it(`Removes elements when the backspace key is pressed`, () => {
          view.type(`hello`)

          view.type(`{Backspace}`)
          cy.get(focusingElementSelector).should(`contain.text`, `hell`)
          cy.get(focusingElementSelector).should(`not.contain.text`, `hello`)
          cy.log(`executed`)
        });
      });
      describe(`Home and End`, () => {
        beforeEach(() => {
          // view.click()
          view.type(`hello world`)
        })

        it(`When pressed Home key, it moves the caret to the first position`, () => {
          view.type(`{Home}`)


          expectCaretIsBehindOf(`${focusingElementSelector} char:first-child`)
          // cy.wait(100)
          // getCaretPosition().should(`equal`, 0)
        });

        it(`When pressed End key, it moves the caret to the last position`, () => {
          view.type(`{Home}`)

          view.type(`{End}`)

          expectCaretIsInFrontOf(`${focusingElementSelector} char:last-child`)
        });
      });
      describe(`Ctrl + Arrow Keys:`, () => {

        describe(`on Ctrl+RightArrow`, () => {

          it(`The caret moves behind the next irregular character`, () => {
            view.type(`hello+world*test`)
            view.type(`{Home}`)

            view.type(`{ctrl}{RightArrow}`)

            expectCaretIsBehindOfLetter(`+`)
          });

          it(`If the caret is already behind an irregular character, it moves next to it`, () => {
            view.type(`hello+world*test`)
            view.type(`{Home}`)
            view.type(`{ctrl}{RightArrow}`)

            view.type(`{ctrl}{RightArrow}`)

            expectCaretIsInFrontOfLetter(`+`)
          });

          it(`If there is no next irregular character, the caret moves to the last position`, () => {
            view.type(`hello`)
            view.type(`{Home}`)

            view.type(`{ctrl}{RightArrow}`)

            expectCaretIsInFrontOf(`${focusingElementSelector} char:last-child`)
          });

        });
        describe(`on Ctrl+LeftArrow`, () => {

          it(`The caret moves next to the previous irregular character`, () => {
            view.type(`hello+world*test`)
            view.type(`{End}`)

            view.type(`{ctrl}{LeftArrow}`)

            expectCaretIsInFrontOfLetter(`*`)
          });

          it(`If the caret is already next to an irregular character, it moves behind it`, () => {
            view.type(`hello+world*test`)
            view.type(`{End}`)
            view.type(`{ctrl}{LeftArrow}`)

            view.type(`{ctrl}{LeftArrow}`)

            expectCaretIsBehindOfLetter(`*`)
          });

          it(`If there is no previous irregular character, the caret moves to the first position`, () => {
            view.type(`hello`)
            view.type(`{End}`)

            view.type(`{ctrl}{LeftArrow}`)

            // cy.wait(100)
            // getCaretPosition().should(`equal`, 0)
            expectCaretIsBehindOf(`${focusingElementSelector} char:first-child`)
          });

        })
      });
      describe(`Ctrl + Home and End keys`, () => {
        beforeEach(() => {
          view.type(`/()`)
          cy.get(`${focusingElementSelector} parenthesis`).click()
          view.type(`{alt}r`)
        })

        it(`When ctrl+Home command is pressed, the caret moves to the start of the base context`, () => {
          view.type(`{ctrl}{Home}`)

          cy.wait(100)
          getCaretPosition().should(`equal`, 0)
        });

        it(`When ctrl+End command is pressed, the caret move to th end of the base context`, () => {
          view.type(`{ctrl}{End}`)

          expectCaretIsInFrontOf(`[data-cy-root] editable-term-container term-container>*:last-child`)
        });
      });
      describe(`Ctrl + Backspace`, () => {

        it(`Removes all the characters between the caret and the previous irregular character`, () => {
          view.type(`hello+world`)

          view.type(`{ctrl}{Backspace}`)

          cy.get(focusingElementSelector).should(`contain.text`, `hello+`)
        });

        it(`If the caret is next to an irregular character, it removes it`, () => {
          view.type(`hello+`)

          view.type(`{ctrl}{Backspace}`)

          cy.get(focusingElementSelector).should(`contain.text`, `hello`)
        });

        it(`If there is no previous irregular character, it removes all the text`, () => {
          view.type(`hello`)

          view.type(`{ctrl}{Backspace}`)

          cy.get(focusingElementSelector).should(`not.contain.text`)
        });

        afterEach(() => {
          cy.log(`end`)
        })
      });
      describe(`Special math characters shortcuts`, () => {
        it(`Adds pi number when ctrl+p command gets pressed `, () => {
          view.type(`{ctrl}p`)

          cy.contains(`${focusingElementSelector} char`, `π`).should(`exist`)
        });
      });
    });

    describe(`Context changes in ${name}:`, () => {
      beforeEach(()=>{
        view.type(addingCommand)
        cy.get(focusingElementSelector).click()
        selectView().type(`{Home}`)
      })

      describe(`Fraction context changes:`, () => {
        beforeEach(() => {
          view.type(`/`)
        })

        describe(`On caret entry:`, () => {
          beforeEach(()=>{
            cy.get(`${focusingElementSelector} frac-child[type="numerator"]`).click()
            selectView()
            view.type(`hello`)
            cy.get(`${focusingElementSelector} frac-child[type="denominator"]`).click()
            selectView()
            view.type(`hello`)
            contextParent()
          })

          it(`When the caret enters from the left, it contexts the fraction numerator`, () => {
            view.type('{Home}')

            view.type(`{RightArrow}`)

            expectContexted(`${focusingElementSelector} frac-child[type="numerator"]`)
            expectCaretIsBehindOf(`${focusingElementSelector} char:first-child`)
          });

          it(`When the caret enters from the right, it contexts the fraction denominator`, () => {
            // selectView()
            // view.type(`hello`)
            // contextParent()
            view.type(`{End}`)

            view.type(`{LeftArrow}`)

            expectContexted(`${focusingElementSelector} frac-child[type="denominator"]`)
            expectCaretIsInFrontOf(`${focusingElementSelector} char:last-child`)
          });
        });

        describe(`Having the caret in the numerator:`, () => {

          beforeEach(() => {
            cy.get(`${focusingElementSelector} frac-child[type="numerator"]`).click();
            selectView()
            view.type(`hello`)
          })

          it(`In the last position, when moving forward, it moves the context to the denominator`, () => {
            view.type(`{End}`)

            view.type(`{RightArrow}`)

            expectContexted(`${focusingElementSelector} frac-child[type="denominator"]`)
          });

          it(`In the first position, when moving backward, it moves the context to the parent element`, () => {
            view.type(`{Home}`)

            view.type(`{LeftArrow}`)

            expectContexted(focusingElementSelector)
            expectCaretIsBehindOf(`${focusingElementSelector} frac`)
          });

        });

        describe(`Having the caret in the denominator:`, () => {
          beforeEach(() => {
            cy.get(`${focusingElementSelector} frac-child[type="denominator"]`).click()
            selectView()
            view.type(`hello`)
          })

          it(`In the first position, when moving backward, it moves the context to the numerator`, () => {
            view.type(`{Home}`)

            view.type(`{LeftArrow}`)

            expectContexted(`${focusingElementSelector} frac-child[type="numerator"]`)
          });

          it(`In the last position, when moving forward, it moves the context to the parent element`, () => {
            view.type(`{End}`)

            view.type(`{RightArrow}`)

            expectContexted(focusingElementSelector)
            expectCaretIsInFrontOf(`${focusingElementSelector} frac`)
          });
        });

      });

      describe(`Exponent context changes:`, () => {
        beforeEach(() => {
          view.type(`{ctrl}e`)
        })

        describe(`On caret entry: `, () => {
          beforeEach(() => {
            cy.get(`${focusingElementSelector} exp`).click()
            selectView()
            view.type(`hello`)
          })
          it(`When the caret enters from the left, it contexts the exponent and moves to its first position`, () => {
            contextParent()
            view.type(`{Home}`)

            view.type(`{RightArrow}`)

            expectContexted(`${focusingElementSelector} exp`)
            expectCaretIsBehindOf(`${focusingElementSelector} char:first-child`)
          });

          it(`When the caret enters from the right, it contexts the exponent and moves to its last position`, () => {
            contextParent()
            view.type(`{End}`)

            view.type(`{LeftArrow}`)

            expectContexted(`${focusingElementSelector} exp`)
            expectCaretIsInFrontOf(`${focusingElementSelector} char:last-child`)
          });
        });

        describe(`On caret exit:`, () => {
          beforeEach(() => {
            view.type(`hello`)
          })

          it(`Having the caret in the first position, when moving backward, it moves the context to the parent element`, () => {
            view.type(`{Home}`)

            view.type(`{LeftArrow}`)

            expectContexted(focusingElementSelector)
            expectCaretIsBehindOf(`${focusingElementSelector} exp`)
          });

          it(`Having the caret in the last position, then moving forward, it moves the context to the parent element`, () => {
            view.type(`{End}`)

            view.type(`{RightArrow}`)

            expectContexted(focusingElementSelector)
            expectCaretIsInFrontOf(`${focusingElementSelector} exp`)
          });


        });
      });

      describe(`Root context changes:`, () => {
        describe(`Simple root:`, () => {
          beforeEach(() => {
            view.type(`{ctrl}r`)
          })

          describe(`On caret entry:`, () => {
            beforeEach(() => {
              view.type(`hello`)
            })

            it(`When the caret enters from the left, it contexts the root and moves to the first position `, () => {
              contextParent()
              view.type(`{Home}`)

              view.type(`{RightArrow}`)

              expectCaretIsBehindOf(`${focusingElementSelector} root char:first-child`)
            });

            it(`When the caret enters from the right, it context the root and moves to the last position`, () => {
              contextParent()
              view.type(`{End}`)

              view.type(`{LeftArrow}`)

              expectCaretIsInFrontOf(`${focusingElementSelector} root char:last-child`)
            });
          });

          describe(`On caret exit:`, () => {
            beforeEach(() => {
              view.type(`hello`)
            })

            it(`Having the caret in the first position, when moving backwards, it moves the context to the parent element`, () => {
              view.type(`{Home}`)

              view.type(`{LeftArrow}`)

              expectContexted(focusingElementSelector)
              expectCaretIsBehindOf(`${focusingElementSelector} root`)
            });

            it(`Having the caret in the last position, when moving forwards, it moves the context to the parent element`, () => {
              view.type(`{End}`)

              view.type(`{RightArrow}`)

              expectContexted(focusingElementSelector)
              expectCaretIsInFrontOf(`${focusingElementSelector} root`)
            });
          });
        });

        describe(`Editable index root`, () => {
          beforeEach(() => {
            view.type(`{alt}r`)
            cy.get(`${focusingElementSelector} root>argument`).click()
            selectView().type(`hello`)
            cy.get(`${focusingElementSelector} root>editable-term-container`).click()
            selectView().type(`hello`)
          })

          describe(`On caret entry`, () => {
            it(`When the caret enters from the left, it contexts the root index editor and moves to the first position`, () => {
              contextParent()
              view.type(`{Home}`)

              view.type(`{RightArrow}`)

              expectContexted(`${focusingElementSelector} root>argument`)
              expectCaretIsBehindOf(`${focusingElementSelector} root>argument char:first-child`)
            });

            it(`When the caret enter from the right, it moves the context to the radicand container and moves to the last position`, () => {
              contextParent()
              view.type(`{End}`)

              view.type(`{LeftArrow}`)

              expectContexted(`${focusingElementSelector} root>editable-term-container`)
              expectCaretIsInFrontOf(`${focusingElementSelector} root>editable-term-container char:last-child`)
            });
          });

          describe(`On caret exit: `, () => {
            describe(`In the index editor:`, () => {
              beforeEach(() => {
                cy.get(`${focusingElementSelector} root>argument`).click()
                selectView()
              })

              it(`Having the caret in the first position, when moving backwards, it moves the context to the parent`, () => {
                view.type(`{Home}`)

                view.type(`{LeftArrow}`)

                expectContexted(focusingElementSelector)
                expectCaretIsBehindOf(`${focusingElementSelector} root`)
              });

              it(`Having the caret in the last position, when moving forward, it moves the context to the radicand container and moves to the first position `, () => {
                view.type(`{End}`)

                view.type(`{RightArrow}`)

                expectContexted(`${focusingElementSelector} root>editable-term-container`)
                expectCaretIsBehindOf(`${focusingElementSelector} root>editable-term-container char:first-child`)
              });
            });

            describe(`In the radicand container:`, () => {
              beforeEach(() => {
                cy.get(`${focusingElementSelector} root>editable-term-container`).click()
                selectView()
              })

              it(`Having the caret in the first position, when moving backwards, it moves the context to the index editor`, () => {
                view.type(`{Home}`)

                view.type(`{LeftArrow}`)

                expectContexted(`${focusingElementSelector} root>argument`)
                expectCaretIsInFrontOf(`${focusingElementSelector} root>argument char:last-child`)
              });

              it(`Having the caret in the last position, when moving forward, it moves the context to the parent`, () => {
                view.type(`{End}`)

                view.type(`{RightArrow}`)

                expectContexted(focusingElementSelector)
                expectCaretIsInFrontOf(`${focusingElementSelector} root`)
              });
            });
          });
        });
      });

      describe(`Parenthesis context changes`, () => {
        beforeEach(() => {
          view.type(`(hello)`)
        })

        describe(`On caret entry:`, () => {

          it(`when the caret enters from the left, it contexts the parenthesis and moves to the first position`, () => {
            view.type(`{Home}`)

            view.type(`{RightArrow}`)

            expectContexted(`${focusingElementSelector} parenthesis`)
            expectCaretIsBehindOf(`${focusingElementSelector} parenthesis char:first-child`)
          });
          it(`when the caret enters from the right, it contexts the parenthesis and moves to the last position`, () => {
            view.type(`{End}`)

            view.type(`{LeftArrow}`)

            expectContexted(`${focusingElementSelector} parenthesis`)
            expectCaretIsInFrontOf(`${focusingElementSelector} parenthesis char:last-child`)
          });

        });

        describe(`On caret exit:`, () => {
          beforeEach(() => {
            cy.get(`${focusingElementSelector} parenthesis`).click()
            selectView()
          })

          it(`When the caret is in the first position, when moving backward, it moves the context to the parent element`, () => {
            view.type(`{Home}`)

            view.type(`{LeftArrow}`)

            expectContexted(focusingElementSelector)
            expectCaretIsBehindOf(`${focusingElementSelector} parenthesis`)
          });

          it(`When the caret it in the last position, when moving forward, it moves the context to the parent element`, () => {
            view.type(`{End}`)

            view.type(`{RightArrow}`)

            expectContexted(focusingElementSelector)
            expectCaretIsInFrontOf(`${focusingElementSelector} parenthesis`)
          });
        });

      });

      describe(`Function context changes`, () => {
        describe(`Normal function`, () => {
          beforeEach(() => {
            view.type(`sen`)
            view.type(`hello`)
          })

          describe(`On caret entry: `, () => {
            it(`When caret enters from the left, it should context the function and move to the first position`, () => {
              contextParent()
              view.type(`{Home}`)

              view.type(`{RightArrow}`)

              expectContexted(`${focusingElementSelector} function>editable-term-container`)
              expectCaretIsBehindOf(`${focusingElementSelector} function char:first-child`)
            });

            it(`When caret enters from the right, it should context the function and move to the last position`, () => {
              contextParent()
              view.type(`{End}`)

              view.type(`{LeftArrow}`)

              expectContexted(`${focusingElementSelector} function>editable-term-container`)
              expectCaretIsInFrontOf(`${focusingElementSelector} function char:last-child`)
            });
          });

          describe(`On caret exit: `, () => {
            it(`When caret is on the first position, when moving backward, it should move the context to the parent`, () => {
              view.type(`{Home}`)

              view.type(`{LeftArrow}`)

              expectContexted(focusingElementSelector)
              expectCaretIsBehindOf(`${focusingElementSelector} function`)
            });

            it(`When caret is on the last position, when moving forward, it should move the context to the parent`, () => {
              view.type(`{End}`)

              view.type(`{RightArrow}`)

              expectContexted(focusingElementSelector)
              expectCaretIsInFrontOf(`${focusingElementSelector} function`)
            });
          });

        });

        describe(`Function with argument: `, () => {
          beforeEach(() => {
            view.type(`log`)
            cy.get(`${focusingElementSelector} function>argument`).click()
            selectView().type(`hello`)
            cy.get(`${focusingElementSelector} function>editable-term-container`).click()
            selectView().type(`hello`)
          })

          describe(`On caret entry:`, () => {
            it(`When caret enters from the left, it contexts the function base and moves to the first position`, () => {
              contextParent()
              view.type(`{Home}`)

              view.type(`{RightArrow}`)

              expectContexted(`${focusingElementSelector} function>argument`)
              expectCaretIsBehindOf(`${focusingElementSelector} function>argument char:first-child`)
            });

            it(`When caret enters from the right, it contexts the function argument and moves to the last position`, () => {
              contextParent()
              view.type(`{End}`)

              view.type(`{LeftArrow}`)

              expectContexted(`${focusingElementSelector} function>editable-term-container`)
              expectCaretIsInFrontOf(`${focusingElementSelector} function>editable-term-container char:last-child`)
            });
          });

          describe(`On caret exit:`, () => {
            describe(`In the function base:`, () => {
              beforeEach(() => {
                cy.get(`${focusingElementSelector} function>argument`).click()
                selectView()
              })

              it(`Having the caret in the first position, when moving backward, it contexts the parent element`, () => {
                view.type(`{Home}`)

                view.type(`{LeftArrow}`)

                expectContexted(focusingElementSelector)
                expectCaretIsBehindOf(`${focusingElementSelector} function`)
              });

              it(`Having the caret in the last position, when moving forward, it contexts the function argument`, () => {
                view.type(`{End}`)

                view.type(`{RightArrow}`)

                expectContexted(`${focusingElementSelector} function>editable-term-container`)
                expectCaretIsBehindOf(`${focusingElementSelector} function>editable-term-container char:first-child`)
              });
            });

            describe(`In the function argument:`, () => {
              beforeEach(() => {
                cy.get(`${focusingElementSelector} function>editable-term-container`).click()
                selectView()
              })

              it(`Having the caret in the first position, when moving backward, it contexts the function base`, () => {
                view.type(`{Home}`)

                view.type(`{LeftArrow}`)

                expectContexted(`${focusingElementSelector} function>argument`)
                expectCaretIsInFrontOf(`${focusingElementSelector} function>argument char:last-child`)
              });

              it(`Having the caret in the last position, when moving forward, it contexts the parent`, () => {
                view.type(`{End}`)

                view.type(`{RightArrow}`)

                expectContexted(focusingElementSelector)
                expectCaretIsInFrontOf(`${focusingElementSelector} function`)
              });
            });
          });
        });
      });
    });

    describe(`Click events in ${name}: `, () => {
      it('Contexts the element when it is empty', () => {
        view.type(addingCommand)

        cy.get(focusingElementSelector).click()

        expectContexted(focusingElementSelector)
      });
    });
  })
}
