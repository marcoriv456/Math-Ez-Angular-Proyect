import { TestBed } from '@angular/core/testing';

import { WritingHandlerService } from './writing-handler.service';
import { InputModule } from '../../../input.module';
import { ContextHandlerService } from '../context-handler/context-handler.service';
import { InputEventBusService } from '../input-event-bus/input-event-bus.service';
import { CaretIndexService } from '../caret-index/caret-index.service';
import { TermUtils } from '../../utils/term-utils.util';
import { KeyTypedEvent } from '../../models/events/io/key-typed.event';
import { CaretHandlerService } from '../caret-handler/caret-handler.service';
import { InputMathElement } from '../../abstracts/input-math-element.abstract';
import { InputCharData } from '../../models/input-char-data.model';
import { Term } from '../../models/terms/term.model';
import { FractionTerm } from '../../models/terms/fraction-term.model';
import { TermSection } from '../../models/term-section.model';

describe('WritingHandlerService', () => {
  let service: WritingHandlerService;
  let currentElementMock: TermSection;
  let caretIndexMock: CaretIndexService;
  let caretHandlerMock: CaretHandlerService;
  let eventBus: InputEventBusService;

  beforeEach(() => {
    currentElementMock = {} as TermSection;
    caretIndexMock = { index: 0 };
    caretHandlerMock = { move: jest.fn() } as unknown as CaretHandlerService;

    TestBed.configureTestingModule({
      imports: [InputModule],
      providers: [
        {
          provide: ContextHandlerService,
          useValue: { getCurrentElement: () => currentElementMock },
        },
        { provide: CaretIndexService, useValue: caretIndexMock },
        { provide: CaretHandlerService, useValue: caretHandlerMock },
      ],
    });

    service = TestBed.inject(WritingHandlerService);

    eventBus = TestBed.inject(InputEventBusService);

    currentElementMock.replace = (from, deleteCount = 1, ...terms) =>
      currentElementMock.terms.splice(from, deleteCount, ...terms);
    currentElementMock.append = (from, ...terms) =>
      currentElementMock.terms.splice(from, 0, ...terms);

    sectionMock = {} as unknown as TermSection;
    elementMock = {
      sectionAt: jest.fn().mockReturnValue(sectionMock),
    } as unknown as InputMathElement<any>;
    currentElementMock.getElement = jest.fn().mockReturnValue(elementMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ------------helpers----------------

  let sectionMock: TermSection;
  let elementMock: InputMathElement<any>;

  const placeCaretAt = (index: number) => (caretIndexMock.index = index);
  const setTerms = (terms: string | Term[]) =>
    (currentElementMock.terms =
      typeof terms == 'string' ? TermUtils.parse(terms) : terms);
  const set = ({
    caretIndex,
    currentElementTerms,
  }: {
    currentElementTerms: string | Term[];
    caretIndex: number;
  }) => {
    setTerms(currentElementTerms);
    placeCaretAt(caretIndex);
  };

  interface CaretPosition {
    element: number;
    section: number;
    character: 'first' | 'last' | number;
    data: InputCharData;
  }

  const expectCaretToBeAt = ({
    element,
    section,
    character,
    data,
  }: CaretPosition) => {
    expect(currentElementMock.getElement).toHaveBeenCalledWith(element);
    expect(
      currentElementMock.getElement(element)?.sectionAt,
    ).toHaveBeenCalledWith(section);

    const sectionAt = currentElementMock
      .getElement(element)
      ?.sectionAt(section);

    if (typeof character === 'number') {
      expect(sectionAt?.getCharData).toHaveBeenCalledWith(character);
      return;
    }

    const locationFunc =
      character == 'first'
        ? sectionAt?.getNoCharData
        : sectionAt?.getLastCharData;
    expect(locationFunc).toHaveBeenCalled();

    expect(caretHandlerMock.move).toHaveBeenCalledWith(data);
  };

  const expectCaretToMoveAfterCharacter = ({
    index,
    data,
  }: {
    index: number;
    data: InputCharData;
  }) => {
    expect(currentElementMock.getCharData).toHaveBeenCalledWith(index);
    expect(caretHandlerMock.move).toHaveBeenCalledWith(data);
  };

  const mockCurrentElementData = (
    data: InputCharData,
    location: 'first' | 'last' | number,
  ) => {
    mockData(currentElementMock, data, location);
  };

  const mockSectionData = (
    data: InputCharData,
    location: 'first' | 'last' | number,
  ) => {
    mockData(sectionMock, data, location);
  };

  const mockData = (
    element: TermSection,
    data: InputCharData,
    location: 'first' | 'last' | number,
  ) => {
    if (location === 'first')
      element.getNoCharData = jest.fn().mockReturnValue(data);
    else if (location === 'last')
      element.getLastCharData = jest.fn().mockReturnValue(data);
    else element.getCharData = jest.fn().mockReturnValue(data);
  };

  const type = ({
    key,
    ctrl,
    alt,
  }: {
    key: string;
    ctrl: boolean;
    alt: boolean;
  }) => eventBus.emit(new KeyTypedEvent(key, ctrl, alt));

  const expectTerms = (...terms: Term[]) =>
    expect(currentElementMock.terms).toEqual(terms);

  // ------------helpers----------------

  describe('Handling append: ', () => {
    describe(`Appending fractions: `, () => {
      it(`Appends a fraction autocompleting itself with the surrounding terms`, () => {
        const expectedData = { index: 9974 } as InputCharData;
        set({ currentElementTerms: 'helloworld', caretIndex: 4 });
        mockSectionData(expectedData, 'last');

        type({ key: '/', ctrl: false, alt: false });

        expectTerms({
          type: 'fraction',
          numeratorChildren: TermUtils.parse('hello'),
          denominatorChildren: TermUtils.parse('world'),
        });
        expectCaretToBeAt({
          element: 0,
          section: 1,
          character: 'last',
          data: expectedData,
        });
      });

      it(`Appends a fraction autocompleting its denominator with the terms behind the caret`, () => {
        const expectedData = { index: 8008 } as InputCharData;
        set({ currentElementTerms: 'hello', caretIndex: 4 });
        mockSectionData(expectedData, 'last');

        type({ key: '/', ctrl: false, alt: false });

        expectTerms({
          type: 'fraction',
          numeratorChildren: TermUtils.parse('hello'),
          denominatorChildren: TermUtils.parse(''),
        });
        expectCaretToBeAt({
          element: 0,
          section: 1,
          character: 'last',
          data: expectedData,
        });
      });

      it(`Appends a fraction autocompleting its numerator with the terms after the caret`, () => {
        const expectedData = { index: 999 } as InputCharData;
        set({ currentElementTerms: 'hello', caretIndex: -1 });
        mockSectionData(expectedData, 'last');

        type({ key: '/', ctrl: false, alt: false });

        expectTerms({
          type: 'fraction',
          numeratorChildren: TermUtils.parse(''),
          denominatorChildren: TermUtils.parse('hello'),
        });
        expectCaretToBeAt({
          element: 0,
          section: 0,
          character: 'last',
          data: expectedData,
        });
      });
    });

    describe(`Appending exponents:`, () => {
      it(`Appends an exponent`, () => {
        const expectedData = { index: 123 } as InputCharData;
        set({ currentElementTerms: '', caretIndex: -1 });
        mockSectionData(expectedData, 'last');

        type({ key: 'e', ctrl: true, alt: false });

        expectTerms({
          type: 'exponent',
          exponentChildren: [],
        });
        expectCaretToBeAt({
          element: 0,
          section: 0,
          character: 'last',
          data: expectedData,
        });
      });
    });

    describe(`Appending roots:`, () => {
      it(`Appends a simple root`, () => {
        const expectedData = { index: 999 } as InputCharData;
        set({ currentElementTerms: '', caretIndex: -1 });
        mockSectionData(expectedData, 'last');

        type({ key: 'r', ctrl: true, alt: false });

        expectTerms({
          type: 'root',
          rootChildren: [],
        });
        expectCaretToBeAt({
          element: 0,
          section: 0,
          character: 'last',
          data: expectedData,
        });
      });

      it(`Appends an editable index root`, () => {
        const expectedData = { index: 100 } as InputCharData;
        set({ currentElementTerms: '', caretIndex: -1 });
        mockSectionData(expectedData, 'last');

        type({ key: 'r', ctrl: false, alt: true });

        expectTerms({
          type: 'root',
          rootChildren: [],
          radicalTerms: [],
        });
        expectCaretToBeAt({
          element: 0,
          section: 0,
          character: 'last',
          data: expectedData,
        });
      });
    });

    describe(`Appending special characters: `, () => {
      it(`Appends a pi`, () => {
        const expectedData = { index: 100 } as InputCharData;
        set({ currentElementTerms: '', caretIndex: -1 });
        mockCurrentElementData(expectedData, 0);

        type({ key: 'p', ctrl: true, alt: false });

        expectTerms({
          type: 'char',
          char: 'π',
        });
        expectCaretToMoveAfterCharacter({ index: 0, data: expectedData });
      });
    });

    describe(`Appending parenthesis: `, () => {
      it(`When typing ')', if it finds a matching '(', it adds a parenthesis`, () => {
        const expectedData = { index: 100 } as InputCharData;
        set({ currentElementTerms: '(hello', caretIndex: 5 });
        mockCurrentElementData(expectedData, 0);

        type({ key: ')', ctrl: false, alt: false });

        expectTerms({
          type: 'parenthesis',
          parenthesisChildren: TermUtils.parse('hello'),
        });
        expectCaretToMoveAfterCharacter({ index: 0, data: expectedData });
      });

      it(`When typing '(', if it finds a matching ')', it adds a parenthesis`, () => {
        const expectedData = { index: 10 } as InputCharData;
        set({ currentElementTerms: 'hello)', caretIndex: -1 });
        mockSectionData(expectedData, 'last');

        type({ key: '(', ctrl: false, alt: false });

        expectTerms({
          type: 'parenthesis',
          parenthesisChildren: TermUtils.parse('hello'),
        });
        expectCaretToBeAt({
          element: 0,
          section: 0,
          character: 'last',
          data: expectedData,
        });
      });
    });

    describe(`Appending functions: `, () => {
      beforeEach(() => {
        mockCurrentElementData({ index: 111 } as InputCharData, 2);
      });

      it(`When typing a recognizable function's name, it appends the function.`, () => {
        const expectedData = { index: 505 } as InputCharData;
        set({ currentElementTerms: 'se', caretIndex: 1 });
        mockSectionData(expectedData, 'last');

        type({ key: 'n', ctrl: false, alt: false });

        expectTerms({
          type: 'function',
          functionName: 'sen',
          functionChildren: [],
        });
        expectCaretToBeAt({
          element: 0,
          section: 0,
          character: 'last',
          data: expectedData,
        });
      });

      it(`When typing a recognizable function's name behind a parenthesis, the function autocompletes itself with those terms.`, () => {
        const expectedData = { index: 505 } as InputCharData;
        set({
          currentElementTerms: [
            ...TermUtils.parse('se'),
            {
              type: 'parenthesis',
              parenthesisChildren: TermUtils.parse('hello'),
            },
          ],
          caretIndex: 1,
        });
        mockCurrentElementData(expectedData, 0);

        type({ key: 'n', ctrl: false, alt: false });

        expectTerms({
          type: 'function',
          functionName: 'sen',
          functionChildren: TermUtils.parse('hello'),
        });
        expectCaretToMoveAfterCharacter({ index: 0, data: expectedData });
      });
    });

    describe(`Appending characters: `, () => {
      it(`When typing a character, it appends the character.`, () => {
        const expectedData = { index: 20 } as InputCharData;
        set({ currentElementTerms: '', caretIndex: -1 });
        mockCurrentElementData(expectedData, 0);

        type({ key: 'a', ctrl: false, alt: false });

        expectTerms({
          type: 'char',
          char: 'a',
        });
        expectCaretToMoveAfterCharacter({ index: 0, data: expectedData });
      });
    });
  });

  describe(`Handling removal:`, () => {
    describe(`When theres no MathElement as parent and the caret is at the first position : `, () => {
      it(`Doesn't perform any simple removal`, () => {
        set({ currentElementTerms: 'hello', caretIndex: -1 });

        type({ key: 'Backspace', ctrl: false, alt: false });

        expectTerms(...TermUtils.parse('hello'));
      });

      it(`Doesn't perform any 'Ctrl' removal`, () => {
        set({ currentElementTerms: 'hello', caretIndex: -1 });

        type({ key: 'Backspace', ctrl: true, alt: false });

        expectTerms(...TermUtils.parse('hello'));
      });
    });

    describe(`'Ctrl' removal: `, () => {
      it(`Removes all the elements after the previous irregular character`, () => {
        const expectedData = { index: 100 } as InputCharData;
        set({ currentElementTerms: 'hello+world', caretIndex: 10 });
        mockCurrentElementData(expectedData, 5);

        type({ key: 'Backspace', ctrl: true, alt: false });

        expectTerms(...TermUtils.parse('hello+'));
        expectCaretToMoveAfterCharacter({ index: 5, data: expectedData });
      });

      it(`If the caret is already next to an irregular character, it is the only one getting deleted`, () => {
        const expectedData = { index: 200 } as InputCharData;
        set({ currentElementTerms: 'hello+world', caretIndex: 5 });
        mockCurrentElementData(expectedData, 4);

        type({ key: 'Backspace', ctrl: true, alt: false });

        expectTerms(...TermUtils.parse('helloworld'));
        expectCaretToMoveAfterCharacter({ index: 4, data: expectedData });
      });

      it(`If it doesn't find an irregular character behind the caret, it just removes all the characters behind it`, () => {
        const expectedData = { index: 300 } as InputCharData;
        set({ currentElementTerms: 'hello+world', caretIndex: 4 });
        mockCurrentElementData(expectedData, -1);

        type({ key: 'Backspace', ctrl: true, alt: false });

        expectTerms(...TermUtils.parse('+world'));
        expectCaretToMoveAfterCharacter({ index: -1, data: expectedData });
      });
    });

    describe(`Outside removal: `, () => {
      describe(`On parenthesis: `, () => {
        it(`Removes the parenthesis but leaves it internal characters`, () => {
          const expectedData = { index: 200 } as InputCharData;
          set({
            currentElementTerms: [
              {
                type: 'parenthesis',
                parenthesisChildren: TermUtils.parse('hello'),
              },
            ],
            caretIndex: 0,
          });
          mockCurrentElementData(expectedData, 5);

          type({ key: 'Backspace', ctrl: false, alt: false });

          expectTerms(...TermUtils.parse('(hello'));
          expectCaretToMoveAfterCharacter({ index: 5, data: expectedData });
        });
      });

      describe(`On characters: `, () => {
        it(`Removes characters: `, () => {
          const expectedData = { index: 200 } as InputCharData;
          set({ currentElementTerms: 'helloo', caretIndex: 5 });
          mockCurrentElementData(expectedData, 4);

          type({ key: 'Backspace', ctrl: false, alt: false });

          expectTerms(...TermUtils.parse('hello'));
          expectCaretToMoveAfterCharacter({ index: 4, data: expectedData });
        });
      });
    });

    describe(`Inside removal: `, () => {
      let parentMock = {} as TermSection;

      // ------------------ helpers -----------------

      const mockParentData = (
        data: InputCharData,
        location: 'first' | 'last' | number,
      ) => mockData(parentMock, data, location);
      const mockParentTerms = (terms: Term[]) =>
        (currentElementMock.mathElement.parent.terms = terms);
      const expectCaretToMoveInParent = ({
        index,
        data,
      }: {
        index: 'first' | 'last' | number;
        data: InputCharData;
      }) => {
        if (typeof index === 'number')
          expect(parentMock.getCharData).toHaveBeenCalledWith(index);
        else {
          const func =
            index == 'first'
              ? parentMock.getNoCharData
              : parentMock.getLastCharData;
          expect(func).toHaveBeenCalled();
        }
        expect(caretHandlerMock.move).toHaveBeenCalledWith(data);
      };

      const expectParentTerms = (...terms: Term[]) =>
        expect(parentMock.terms).toEqual(terms);

      // ------------------ helpers -----------------
      beforeEach(() => {
        parentMock.replace = (from, deleteCount = 1, ...terms) =>
          parentMock.terms.splice(from, deleteCount, ...terms);
        currentElementMock.mathElement = {
          parent: parentMock,
          index: 0,
        } as InputMathElement<any>;
      });

      describe(`On common MathElements: `, () => {
        it(`Removes an element and leaves its inner terms`, () => {
          const expectedData = { index: 399 } as InputCharData;
          const currentElementAsTerm: Term = {
            type: 'exponent',
            exponentChildren: TermUtils.parse('hello'),
          };
          set({
            caretIndex: -1,
            currentElementTerms: currentElementAsTerm.exponentChildren,
          });
          mockParentTerms([currentElementAsTerm]);
          mockParentData(expectedData, -1);

          type({ key: 'Backspace', ctrl: false, alt: false });

          expectTerms(...TermUtils.parse('hello'));
          expectCaretToMoveInParent({ index: -1, data: expectedData });
        });
      });

      describe(`On fractions: `, () => {
        it(`If the caret is in the numerator's first position, it leaves the inner terms of both the numerator and the denominator and places the caret behind them`, () => {
          const expectedData = { index: 100 } as InputCharData;
          const currentTerm: FractionTerm = {
            type: 'fraction',
            numeratorChildren: TermUtils.parse('hello'),
            denominatorChildren: TermUtils.parse('world'),
          };
          currentElementMock.index = 0;
          set({
            caretIndex: -1,
            currentElementTerms: currentTerm.numeratorChildren,
          });
          mockParentTerms([currentTerm]);
          mockParentData(expectedData, -1);

          type({ key: 'Backspace', ctrl: false, alt: false });

          expectParentTerms(...TermUtils.parse('helloworld'));
          expectCaretToMoveInParent({ index: -1, data: expectedData });
        });

        it(`If the caret is in the denominator's first position, it leaves the inner terms of both the numerator and denominator and places the caret in the middle of them`, () => {
          const expectedData = { index: 100 } as InputCharData;
          const currentTerm: FractionTerm = {
            type: 'fraction',
            numeratorChildren: TermUtils.parse('hello'),
            denominatorChildren: TermUtils.parse('world'),
          };
          set({
            caretIndex: -1,
            currentElementTerms: currentTerm.denominatorChildren,
          });
          currentElementMock.index = 1;
          mockParentTerms([currentTerm]);
          mockParentData(expectedData, 4);

          type({ key: 'Backspace', ctrl: false, alt: false });

          expectParentTerms(...TermUtils.parse('helloworld'));
          expectCaretToMoveInParent({ index: 4, data: expectedData });
        });
      });
    });
  });
});
