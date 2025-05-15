import {TestBed} from '@angular/core/testing';

import {WritingHandlerService} from './writing-handler.service';
import {InputModule} from "../../../input.module";
import {
  EditableTermContainerComponent
} from "../../../ui/molecules/editable-term-container/editable-term-container.component";
import {ContextHandlerService} from "../context-handler/context-handler.service";
import {InputEventBusService} from "../input-event-bus/input-event-bus.service";
import {CaretIndexService} from "../caret-index/caret-index.service";
import {TermUtils} from "../../utils/term-utils.util";
import {KeyTypedEvent} from "../../models/events/io/key-typed.event";
import {CaretHandlerService} from "../caret-handler/caret-handler.service";
import {InputMathElement} from "../../abstracts/input-math-element.abstract";
import {InputCharData} from "../../models/input-char-data.model";
import {Term} from "../../models/terms/term.model";

describe('WritingHandlerService', () => {
  let service: WritingHandlerService;
  let currentElementMock: EditableTermContainerComponent
  let caretIndexMock: CaretIndexService
  let caretHandlerMock: CaretHandlerService
  let eventBus: InputEventBusService

  beforeEach(() => {
    currentElementMock = {} as EditableTermContainerComponent
    caretIndexMock = {index: 0}
    caretHandlerMock = {move: jest.fn()} as unknown as CaretHandlerService

    TestBed.configureTestingModule({
      imports: [InputModule],
      providers: [
        {provide: ContextHandlerService, useValue: {getCurrentElement: () => currentElementMock}},
        {provide: CaretIndexService, useValue: caretIndexMock}
        , {provide: CaretHandlerService, useValue: caretHandlerMock}
      ]
    });

    service = TestBed.inject(WritingHandlerService);
    eventBus = TestBed.inject(InputEventBusService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Handling append: ', () => {
    let sectionMock: EditableTermContainerComponent
    let elementMock: InputMathElement<any>;

    // ------------helpers----------------

    const placeCaretAt = (index: number) => caretIndexMock.index = index
    const setTerms = (terms: string | Term[]) => currentElementMock.terms = typeof terms == 'string' ? TermUtils.parse(terms) : terms
    const set = ({index, terms}: { terms: string | Term[], index: number }) => {
      setTerms(terms)
      placeCaretAt(index)
    }

    const expectCaretToBeAt = ({element, section, character, data}: {
      element: number,
      section: number,
      character: 'first' | 'last' | number,
      data: InputCharData
    }) => {
      expect(currentElementMock.getElement).toHaveBeenCalledWith(element)
      expect(currentElementMock.getElement(element)?.sectionAt).toHaveBeenCalledWith(section)

      const sectionAt = currentElementMock.getElement(element)?.sectionAt(section)

      if (typeof character === 'number') {
        expect(sectionAt?.getCharData).toHaveBeenCalledWith(character)
        return;
      }

      const locationFunc = character == 'first' ? sectionAt?.getNoCharData : sectionAt?.getLastCharData
      expect(locationFunc).toHaveBeenCalled()

      expect(caretHandlerMock.move).toHaveBeenCalledWith(data)
    }

    const expectCaretToMoveAfterCharacter = ({index, data}: { index: number, data: InputCharData }) => {
      expect(currentElementMock.getCharData).toHaveBeenCalledWith(index)
      expect(caretHandlerMock.move).toHaveBeenCalledWith(data)
    }

    const mockCurrentElementData = (data: InputCharData, location: 'first' | 'last' | number) => {
      mockData(currentElementMock, data, location)
    }

    const mockSectionData = (data: InputCharData, location: 'first' | 'last' | number) => {
      mockData(sectionMock, data, location)
    }

    const mockData = (element: EditableTermContainerComponent, data: InputCharData, location: 'first' | 'last' | number) => {
      if (location === 'first')
        element.getNoCharData = jest.fn().mockReturnValue(data)
      else if (location === 'last')
        element.getLastCharData = jest.fn().mockReturnValue(data)
      else
        element.getCharData = jest.fn().mockReturnValue(data)
    }

    const type = ({key, ctrl, alt}: {
      key: string,
      ctrl: boolean,
      alt: boolean
    }) => eventBus.emit(new KeyTypedEvent(key, ctrl, alt))

    const expectTerms = (...terms: Term[]) => expect(currentElementMock.terms).toEqual(terms)

    // ------------helpers----------------


    beforeEach(() => {
      currentElementMock.replace = (from, deleteCount = 1, ...terms) => currentElementMock.terms.splice(from, deleteCount, ...terms)
      currentElementMock.append = (from, ...terms) => currentElementMock.terms.splice(from, 0, ...terms)
      sectionMock = {} as unknown as EditableTermContainerComponent
      elementMock = {sectionAt: jest.fn().mockReturnValue(sectionMock)} as unknown as InputMathElement<any>
      currentElementMock.getElement = jest.fn().mockReturnValue(elementMock)
    })

    describe(`Appending fractions: `, () => {
      it(`Appends a fraction autocompleting itself with the surrounding terms`, () => {
        const expectedData = {index: 9974} as InputCharData
        set({terms: "helloworld", index: 4})
        mockSectionData(expectedData, 'last')

        type({key: '/', ctrl: false, alt: false})

        expectTerms({
          type: 'fraction',
          numeratorChildren: TermUtils.parse('hello'),
          denominatorChildren: TermUtils.parse('world')
        })
        expectCaretToBeAt({element: 0, section: 1, character: 'last', data: expectedData})
      });

      it(`Appends a fraction autocompleting its denominator with the terms behind the caret`, () => {
        const expectedData = {index: 8008} as InputCharData
        set({terms: "hello", index: 4})
        mockSectionData(expectedData, 'last')

        type({key: '/', ctrl: false, alt: false})

        expectTerms({
          type: 'fraction',
          numeratorChildren: TermUtils.parse('hello'),
          denominatorChildren: TermUtils.parse('')
        })
        expectCaretToBeAt({element: 0, section: 1, character: 'last', data: expectedData})
      });

      it(`Appends a fraction autocompleting its numerator with the terms after the caret`, () => {
        const expectedData = {index: 999} as InputCharData
        set({terms: "hello", index: -1})
        mockSectionData(expectedData, 'last')

        type({key: '/', ctrl: false, alt: false})

        expectTerms({
          type: 'fraction',
          numeratorChildren: TermUtils.parse(''),
          denominatorChildren: TermUtils.parse('hello')
        })
        expectCaretToBeAt({element: 0, section: 0, character: 'last', data: expectedData})
      });
    });

    describe(`Appending exponents:`, () => {

      it(`Appends an exponent`, () => {
        const expectedData = {index: 123} as InputCharData
        set({terms: "", index: -1})
        mockSectionData(expectedData, 'last')

        type({key: 'e', ctrl: true, alt: false})

        expectTerms({
          type: 'exponent',
          exponentChildren: []
        })
        expectCaretToBeAt({element: 0, section: 0, character: 'last', data: expectedData})
      });
    });

    describe(`Appending roots:`, () => {

      it(`Appends a simple root`, () => {
        const expectedData = {index: 999} as InputCharData
        set({terms: "", index: -1})
        mockSectionData(expectedData, 'last')

        type({key: 'r', ctrl: true, alt: false})

        expectTerms({
          type: 'root',
          rootChildren: []
        })
        expectCaretToBeAt({element: 0, section: 0, character: 'last', data: expectedData})
      });

      it(`Appends an editable index root`, () => {
        const expectedData = {index: 100} as InputCharData
        set({terms: "", index: -1})
        mockSectionData(expectedData, 'last')

        type({key: 'r', ctrl: false, alt: true})

        expectTerms({
          type: 'root',
          rootChildren: [],
          radicalTerms: []
        })
        expectCaretToBeAt({element: 0, section: 0, character: 'last', data: expectedData})
      });
    });

    describe(`Appending special characters: `, () => {
      it(`Appends a pi`, () => {
        const expectedData = {index: 100} as InputCharData
        set({terms: "", index: -1})
        mockCurrentElementData(expectedData, 0)

        type({key: 'p', ctrl: true, alt: false})

        expectTerms({
          type: 'char',
          char: 'π'
        })
        expectCaretToMoveAfterCharacter({index: 0, data: expectedData})
      });
    });


    describe(`Appending parenthesis: `, () => {
      it(`When typing ')', if it finds a matching '(', it adds a parenthesis`, () => {
        const expectedData = {index: 100} as InputCharData
        set({terms: "(hello", index: 5})
        mockCurrentElementData(expectedData, 0)

        type({key: ')', ctrl: false, alt: false})

        expectTerms({
          type: 'parenthesis',
          parenthesisChildren: TermUtils.parse('hello')
        })
        expectCaretToMoveAfterCharacter({index: 0, data: expectedData})
      });

      it(`When typing '(', if it finds a matching ')', it adds a parenthesis`, () => {
        const expectedData = {index: 10} as InputCharData
        set({terms: "hello)", index: -1})
        mockSectionData(expectedData, 'last')

        type({key: '(', ctrl: false, alt: false})

        expectTerms({
          type: 'parenthesis',
          parenthesisChildren: TermUtils.parse('hello')
        })
        expectCaretToBeAt({element: 0, section: 0, character: 'last', data: expectedData})
      });
    });

    describe(`Appending functions: `, () => {
      beforeEach(() => {
        mockCurrentElementData({index: 111} as InputCharData, 2)
      })

      it(`When typing a recognizable function's name, it appends the function.`, () => {
        const expectedData = {index: 505} as InputCharData
        set({terms: "se", index: 1})
        mockSectionData(expectedData, 'last')

        type({key: 'n', ctrl: false, alt: false})

        expectTerms({type: 'function', functionName: 'sen', functionChildren: []})
        expectCaretToBeAt({element: 0, section: 0, character: 'last', data: expectedData})
      });

      it(`When typing a recognizable function's name behind a parenthesis, the function autocompletes itself with those terms.`, () => {
        const expectedData = {index: 505} as InputCharData
        set({
          terms: [...TermUtils.parse('se'), {type: 'parenthesis', parenthesisChildren: TermUtils.parse("hello")}],
          index: 1
        })
        mockCurrentElementData(expectedData, 0)

        type({key: 'n', ctrl: false, alt: false})

        expectTerms({
          type: 'function',
          functionName: 'sen',
          functionChildren: TermUtils.parse("hello")
        })
        expectCaretToMoveAfterCharacter({index: 0, data: expectedData})
      });
    });

    describe(`Appending characters: `, () => {
      it(`When typing a character, it appends the character.`, () => {
        const expectedData = {index: 20} as InputCharData
        set({terms: "", index: -1})
        mockCurrentElementData(expectedData, 0)

        type({key: 'a', ctrl: false, alt: false})

        expectTerms({
          type: 'char',
          char: 'a'
        })
        expectCaretToMoveAfterCharacter({index: 0, data: expectedData})
      });
    });
  })
});
