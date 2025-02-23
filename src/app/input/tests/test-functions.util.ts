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
import {VariableHandlerService} from "../services/variable-handler/variable-handler.service";

export const mountInput = () => cy.mount(InputComponent, {
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
    VariableHandlerService,
  ]
})

export const selectView = () => cy.get(`[data-cy-root]`)

export const getPosition = (element: JQuery<HTMLElement>) => Math.floor(element.get()[0].getBoundingClientRect().left)

export const getFrontPosition = (element: JQuery<HTMLElement>) => Math.floor(getPosition(element) + (element.width() || 0))

export const getCaretPosition = () => cy.get(`#caret-container`).then(getPosition)

export const getElementPosition = (selector: string) => cy.get(selector).then(getPosition)
export const getElementFrontPosition = (selector: string) => cy.get(selector).then(getFrontPosition)

export const getLetterPosition = (letter: string) => cy.contains(`char`, letter).then(getPosition)
export const getLetterFrontPosition = (letter: string) => cy.contains(`char`, letter).then(getFrontPosition)

export const expectCaretIsBehindOf = (selector:string) =>{
  cy.wait(100)
  getElementPosition(selector).then(position=>{
    getCaretPosition().should(`be.closeTo`,position,5)
  })
}

export const expectCaretIsInFrontOf = (selector:string) => {
  cy.wait(100)
  getElementFrontPosition(selector).then(position=>{
    getCaretPosition().should(`be.closeTo`,position,5)
  })
}

export const expectCaretIsBehindOfLetter = (letter:string) => {
  cy.wait(100)
  getLetterPosition(letter).then(position=>{
    getCaretPosition().should(`be.closeTo`,position,3)
  })
}

export const expectCaretIsInFrontOfLetter = (letter:string) => {
  cy.wait(100)
  getLetterFrontPosition(letter).then(position=>{
    getCaretPosition().should(`be.closeTo`,position,3)
  })
}

export const getHeight = (el: JQuery<HTMLElement>) => Math.floor(el.outerHeight() || 0)

export const caretHeight = () => cy.get(`#caret-container`).then(getHeight)

export const expectContexted = (selector: string) => {
  cy.wait(100)
  cy.get(selector)
    .should(`have.class`, `selected`)
    .then(getHeight)
    .then(height => {
      caretHeight().should(`be.closeTo`, height,3)
    })
}

export const contextParent = () => {
  selectView()
    .type('{End}')
    .type('{RightArrow}')
    .type('{Home}')
}

export const clickAndType = (selector:string, phrase:string) => {
  cy.get(selector).click()
  selectView().type(phrase)
}
