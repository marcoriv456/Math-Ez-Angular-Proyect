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
    getCaretPosition().should(`be.closeTo`,position,3)
  })
}

export const expectCaretIsInFrontOf = (selector:string) => {
  cy.wait(100)
  getElementFrontPosition(selector).then(position=>{
    getCaretPosition().should(`be.closeTo`,position,3)
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
