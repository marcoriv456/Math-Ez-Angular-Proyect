import {TestBed} from '@angular/core/testing';

import {ContextHandlerService} from './context-handler.service';
import {InputModule} from "../../../input.module";
import {
  EditableTermContainerComponent
} from "../../../ui/molecules/editable-term-container/editable-term-container.component";
import {CaretIndexService} from "../caret-index/caret-index.service";
import {InputCharData} from "../../models/input-char-data.model";
import {InputMathElement} from "../../abstracts/input-math-element.abstract";

describe('ContextHandlerService', () => {
  let service: ContextHandlerService;

  const caretIndexMock: CaretIndexService = {index: 0}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputModule],
      providers: [
        {provide: CaretIndexService, useValue: caretIndexMock}
      ]
    });
    service = TestBed.inject(ContextHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(`Contexting elements`, () => {
    it(`After contexting an element it sets it as selected`, () => {
      const element = {selected: false} as EditableTermContainerComponent

      service.contextElement(element);

      expect(element.selected).toBe(true);
    });

    it(`After contexting an element it stores the element as the current element`, () => {
      const element = {selected: false} as EditableTermContainerComponent

      service.contextElement(element)

      expect(service.getCurrentElement()).toBe(element);
    });
  });

  describe(`Getting context data: `, () => {
    describe(`Forward data: `, () => {

      const currentElementMock = {selected: false} as EditableTermContainerComponent

      beforeEach(() => {
        service.contextElement(currentElementMock)
      })

      it(`If there is a character next to the caret, it returns the data next to it `, () => {
        const expectedData = {index: 456} as InputCharData
        currentElementMock.getTermLocation = () => ({character: {next: 'char'}, container: {}})
        currentElementMock.getCharData = () => expectedData
        caretIndexMock.index = 0

        const data = service.getForwardContextData();

        expect(data).toEqual(expectedData)
      });

      it(`If there isn't any element next to the caret but a container, it returns that container's first character's data `, () => {
        const expectedData = {index: 456} as InputCharData
        currentElementMock.getTermLocation = () => ({character: {}, container: {nextExist: true}})
        currentElementMock.mathElement = {nextSection: {getNoCharData: () => expectedData} as EditableTermContainerComponent} as InputMathElement<any>

        const data = service.getForwardContextData()

        expect(data).toEqual(expectedData)
      });

      it(`If there is no element next to the caret and the actual container is the main one, it returns the last character data`, () => {
        const expectedData = {index: 123} as InputCharData
        currentElementMock.getTermLocation = () => ({character: {}, container: {isThisMain: true}})
        currentElementMock.getLastCharData = jest.fn().mockReturnValue(expectedData)

        const data = service.getForwardContextData()

        expect(data).toEqual(expectedData)
        expect(currentElementMock.getLastCharData).toHaveBeenCalled()
      });

      it(`If the next element is a Math one, it returns its first element's first character data`, () => {
        const expectedData = {index: 123} as InputCharData
        currentElementMock.getTermLocation = () => ({character: {next: 'frac'}, container: {}})
        currentElementMock.getElement = jest.fn().mockReturnValue({firstSection: {getNoCharData: () => expectedData}})
        caretIndexMock.index = 1

        const data = service.getForwardContextData()

        expect(data).toEqual(expectedData)
        expect(currentElementMock.getElement).toHaveBeenCalledWith(2)
      });

      it(`If there isn't any character nor container next to the caret, it returns the data next to the current Math element`, () => {
        const expectedData = {index: 77} as InputCharData
        currentElementMock.getTermLocation = () => ({character: {}, container: {}})
        currentElementMock.mathElement = {
          parent: {getCharData: jest.fn().mockReturnValue(expectedData)},
          index: 77
        } as unknown as InputMathElement<any>

        const data = service.getForwardContextData()

        expect(data).toEqual(expectedData)
        expect(currentElementMock.mathElement.parent.getCharData).toHaveBeenCalledWith(77)
      });

    });
  });
});
