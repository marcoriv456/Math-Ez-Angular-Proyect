import { TestBed } from '@angular/core/testing';

import { ContextHandlerService } from './context-handler.service';
import { InputModule } from '../../../input.module';
import { CaretIndexService } from '../caret-index/caret-index.service';
import { InputCharData } from '../../models/input-char-data.model';
import { InputMathElement } from '../../abstracts/input-math-element.abstract';
import { TermUtils } from '../../utils/term-utils.util';
import { SpecialCharFinder } from '../../helpers/special-char-finder/special-char-finder.helper';
import { TermSection } from '../../models/term-section.model';

describe('ContextHandlerService', () => {
  let service: ContextHandlerService;

  const caretIndexMock: CaretIndexService = { index: 0 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputModule],
      providers: [{ provide: CaretIndexService, useValue: caretIndexMock }],
    });
    service = TestBed.inject(ContextHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(`Contexting elements:`, () => {
    it(`After contexting an element it sets it as selected`, () => {
      const element = { selected: false } as TermSection;

      service.contextElement(element);

      expect(element.selected).toBe(true);
    });

    it(`After contexting an element it stores the element as the current element`, () => {
      const element = { selected: false } as TermSection;

      service.contextElement(element);

      expect(service.getCurrentElement()).toBe(element);
    });
  });

  describe(`Getting context data: `, () => {
    const currentElementMock = { selected: false } as TermSection;

    beforeEach(() => {
      service.contextElement(currentElementMock);
    });

    describe(`Forward data: `, () => {
      it(`If there is a character next to the caret, it returns the data next to it `, () => {
        const expectedData = { index: 456 } as InputCharData;
        currentElementMock.getTermLocation = () => ({
          character: { next: 'char' },
          container: {},
        });
        currentElementMock.getCharData = jest
          .fn()
          .mockReturnValue(expectedData);
        caretIndexMock.index = 0;

        const data = service.getForwardContextData();

        expect(data).toEqual(expectedData);
        expect(currentElementMock.getCharData).toHaveBeenCalledWith(1);
      });

      it(`If there isn't any element next to the caret but a container, it returns that container's first character's data `, () => {
        const expectedData = { index: 456 } as InputCharData;
        currentElementMock.getTermLocation = () => ({
          character: {},
          container: { nextExist: true },
        });
        currentElementMock.mathElement = {
          nextSection: { getNoCharData: () => expectedData } as TermSection,
        } as InputMathElement<any>;

        const data = service.getForwardContextData();

        expect(data).toEqual(expectedData);
      });

      it(`If there is no element next to the caret and the actual container is the main one, it returns the last character data`, () => {
        const expectedData = { index: 123 } as InputCharData;
        currentElementMock.getTermLocation = () => ({
          character: {},
          container: { isThisMain: true },
        });
        currentElementMock.getLastCharData = () => expectedData;

        const data = service.getForwardContextData();

        expect(data).toEqual(expectedData);
      });

      it(`If the next element is a Math one, it returns its first element's first character data`, () => {
        const expectedData = { index: 123 } as InputCharData;
        currentElementMock.getTermLocation = () => ({
          character: { next: 'frac' },
          container: {},
        });
        currentElementMock.getElement = jest
          .fn()
          .mockReturnValue({
            firstSection: { getNoCharData: () => expectedData },
          });
        caretIndexMock.index = 1;

        const data = service.getForwardContextData();

        expect(data).toEqual(expectedData);
        expect(currentElementMock.getElement).toHaveBeenCalledWith(2);
      });

      it(`If there isn't any character nor container next to the caret, it returns the data next to the current Math element`, () => {
        const expectedData = { index: 77 } as InputCharData;
        currentElementMock.getTermLocation = () => ({
          character: {},
          container: {},
        });
        currentElementMock.mathElement = {
          parent: { getCharData: jest.fn().mockReturnValue(expectedData) },
          index: 77,
        } as unknown as InputMathElement<any>;

        const data = service.getForwardContextData();

        expect(data).toEqual(expectedData);
        expect(
          currentElementMock.mathElement.parent.getCharData,
        ).toHaveBeenCalledWith(77);
      });
    });

    describe(`Backward data: `, () => {
      it(`If there is a character behind the caret, it returns the data behind it `, () => {
        const expectedData = { index: 456 } as InputCharData;
        currentElementMock.getTermLocation = () => ({
          character: { actual: 'char' },
          container: {},
        });
        currentElementMock.getCharData = jest
          .fn()
          .mockReturnValue(expectedData);
        caretIndexMock.index = 2;

        const data = service.getBackwardContextData();

        expect(data).toEqual(expectedData);
        expect(currentElementMock.getCharData).toHaveBeenCalledWith(1);
      });

      it(`If there isn't any element behind the caret but a container, it returns that container's last character's data `, () => {
        const expectedData = { index: 456 } as InputCharData;
        currentElementMock.getTermLocation = () => ({
          character: {},
          container: { prevExist: true },
        });
        currentElementMock.mathElement = {
          previousSection: {
            getLastCharData: () => expectedData,
          } as TermSection,
        } as InputMathElement<any>;

        const data = service.getBackwardContextData();

        expect(data).toEqual(expectedData);
      });

      it(`If there is no element behind the caret and the actual container is the main one, it returns main container's no character data`, () => {
        const expectedData = { index: 123 } as InputCharData;
        currentElementMock.getTermLocation = () => ({
          character: {},
          container: { isThisMain: true },
        });
        currentElementMock.getNoCharData = jest
          .fn()
          .mockReturnValue(expectedData);

        const data = service.getBackwardContextData();

        expect(data).toEqual(expectedData);
      });

      it(`If the caret is behind a Math element, it returns its last element's last character data`, () => {
        const expectedData = { index: 123 } as InputCharData;
        currentElementMock.getTermLocation = () => ({
          character: { actual: 'frac' },
          container: {},
        });
        currentElementMock.getElement = jest
          .fn()
          .mockReturnValue({
            lastSection: { getLastCharData: () => expectedData },
          });
        caretIndexMock.index = 1;

        const data = service.getBackwardContextData();

        expect(data).toEqual(expectedData);
        expect(currentElementMock.getElement).toHaveBeenCalledWith(1);
      });

      it(`If there isn't any character nor container behind the caret, it returns the data behind the current Math element`, () => {
        const expectedData = { index: 76 } as InputCharData;
        currentElementMock.getTermLocation = () => ({
          character: {},
          container: {},
        });
        currentElementMock.mathElement = {
          parent: { getCharData: jest.fn().mockReturnValue(expectedData) },
          index: 77,
        } as unknown as InputMathElement<any>;

        const data = service.getBackwardContextData();

        expect(data).toEqual(expectedData);
        expect(
          currentElementMock.mathElement.parent.getCharData,
        ).toHaveBeenCalledWith(76);
      });
    });
  });

  describe(`Getting irregular character data: `, () => {
    let currentElementMock: TermSection;

    beforeEach(() => {
      currentElementMock = {} as TermSection;
      service.contextElement(currentElementMock);
    });

    describe(`Getting next irregular data: `, () => {
      it(`Returns the current element's next irregular character data`, () => {
        const terms = TermUtils.parse('hola+mundo');
        const expectedData = { index: 60 };
        caretIndexMock.index = -1;
        currentElementMock.terms = terms;
        currentElementMock.getCharData = jest
          .fn()
          .mockReturnValue(expectedData);

        const data = service.getNextIrregularCharDataToMoveAt();

        expect(data).toEqual(expectedData);
        expect(currentElementMock.getCharData).toHaveBeenCalledWith(3);
      });

      it(`If there is no next irregular character data it returns the last character's data`, () => {
        const terms = TermUtils.parse('hola+mundo');
        const expectedData = { index: 110 };
        caretIndexMock.index = 6;
        currentElementMock.terms = terms;
        currentElementMock.getCharData = jest.fn().mockReturnValue(undefined);
        currentElementMock.getLastCharData = jest
          .fn()
          .mockReturnValue(expectedData);

        const data = service.getNextIrregularCharDataToMoveAt();

        expect(data).toEqual(expectedData);
        expect(currentElementMock.getCharData).toHaveBeenCalledWith(9);
        expect(currentElementMock.getLastCharData).toHaveBeenCalled();
      });
    });

    describe(`Getting previous irregular data: `, () => {
      it(`Returns the current element's previous irregular char data`, () => {
        const terms = TermUtils.parse('hola+mundo');
        const expectedData = { index: 115 };
        caretIndexMock.index = 9;
        currentElementMock.terms = terms;
        currentElementMock.getCharData = jest
          .fn()
          .mockReturnValue(expectedData);

        const data = service.getPrevIrregularCharToMoveAt();

        expect(data).toEqual(expectedData);
        expect(currentElementMock.getCharData).toHaveBeenCalledWith(4);
      });

      it(`If there is no previous irregular character data it returns no character's data`, () => {
        const terms = TermUtils.parse('hola+mundo');
        const expectedData = { index: 110 };
        caretIndexMock.index = 2;
        currentElementMock.terms = terms;
        currentElementMock.getCharData = jest.fn().mockReturnValue(undefined);
        currentElementMock.getNoCharData = jest
          .fn()
          .mockReturnValue(expectedData);

        const data = service.getPrevIrregularCharToMoveAt();

        expect(data).toEqual(expectedData);
        expect(currentElementMock.getCharData).toHaveBeenCalledWith(-1);
        expect(currentElementMock.getNoCharData).toHaveBeenCalled();
      });
    });
  });
});
