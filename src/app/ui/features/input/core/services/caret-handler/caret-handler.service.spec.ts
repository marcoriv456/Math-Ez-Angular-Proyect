import { TestBed } from '@angular/core/testing';

import { CaretHandlerService } from './caret-handler.service';
import {InputModule} from "../../../input.module";
import {ContextHandlerService} from "../context-handler/context-handler.service";
import {InputEventBusService} from "../input-event-bus/input-event-bus.service";
import {CharClickedEvent} from "../../models/events/io/char-clicked.event";
import {InputCharData} from "../../models/input-char-data.model";
import {CaretMoveRequestEvent} from "../../models/events/caret/caret-move-request.event";
import {KeyTypedEvent} from "../../models/events/io/key-typed.event";

describe('CaretHandlerService', () => {
  let service: CaretHandlerService;

  const contextHandler:Partial<ContextHandlerService> = {contextElement: ()=>{} }
  const eventBus = new InputEventBusService()

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputModule],
      providers: [
        {provide: ContextHandlerService, useValue: contextHandler},
        {provide: InputEventBusService, useValue: eventBus}
      ]
    });
    service = TestBed.inject(CaretHandlerService);
  });

  it('Is created', () => {
    expect(service).toBeTruthy();
  });

  describe('On char clicked events: ', () => {
    it('Emits a CaretMoveRequestEvent when it gets notified that a char was clicked', () => {
      const charData = {parent:{}, positionX: 10, index:1} as InputCharData
      const event = new CharClickedEvent(charData);
      jest.spyOn(eventBus,'emit')

      eventBus.emit(event)

      expect(eventBus.emit).toHaveBeenCalledWith(new CaretMoveRequestEvent(charData));
    });
  });

  describe('On key typed events: ', () => {

    beforeEach(() => {
      jest.spyOn(eventBus, 'emit')
    })

    describe('On normal keys: ', () => {
      it('On "ArrowLeft" key emits a CaretMoveRequestEvent with the forward character data', () => {
        const dummyData = {parent:{}, positionX: 10, index:1} as InputCharData
        contextHandler.getForwardContextData = () => dummyData

        const event = new KeyTypedEvent("ArrowLeft", false, false);
        eventBus.emit(event)

        expect(eventBus.emit).toHaveBeenCalledWith(new CaretMoveRequestEvent(dummyData));
      });

      it('On "ArrowRight" key emits a CaretMoveRequestEvent with the backward character data', () => {
        const dummyData = {parent:{}, positionX: 10, index:1} as InputCharData
        contextHandler.getBackwardContextData = () => dummyData

        const event = new KeyTypedEvent("ArrowRight", false, false);
        eventBus.emit(event)

        expect(eventBus.emit).toHaveBeenCalledWith(new CaretMoveRequestEvent(dummyData));
      });

      it('On "Home" key emits a CaretMoveRequestEvent with the actual container\'s first character data', () => {
        const dummyData = {parent:{}, positionX: 10, index:1} as InputCharData
        contextHandler.getFirstCharData = () => dummyData

        const event = new KeyTypedEvent("Home", false, false);
        eventBus.emit(event)

        expect(eventBus.emit).toHaveBeenCalledWith(new CaretMoveRequestEvent(dummyData));
      });

      it('On "End" key emits a CaretMoveRequestEvent with the actual container\'s last character data', () => {
        const dummyData = {parent:{}, positionX: 10, index:1} as InputCharData
        contextHandler.getLastCharData = () => dummyData

        const event = new KeyTypedEvent("End", false, false);
        eventBus.emit(event)

        expect(eventBus.emit).toHaveBeenCalledWith(new CaretMoveRequestEvent(dummyData));
      });
    });

    describe('On Ctrl keys: ', () => {
      it('On "ArrowLeft" key emits a CaretMoveRequestEvent with the next irregular character data', () => {
        const dummyData = {parent:{}, positionX: 10, index:1} as InputCharData
        contextHandler.getNextIrregularCharDataToMoveAt = () => dummyData

        const event = new KeyTypedEvent("ArrowLeft", true, false);
        eventBus.emit(event)

        expect(eventBus.emit).toHaveBeenCalledWith(new CaretMoveRequestEvent(dummyData));
      });

      it('On "ArrowRight" key emits a CaretMoveRequestEvent with the previous irregular character data', () => {
        const dummyData = {parent:{}, positionX: 10, index:1} as InputCharData
        contextHandler.getPrevIrregularCharToMoveAt = () => dummyData

        const event = new KeyTypedEvent("ArrowRight", true, false);
        eventBus.emit(event)

        expect(eventBus.emit).toHaveBeenCalledWith(new CaretMoveRequestEvent(dummyData));
      });

      it('On "Home" key emits a CaretMoveRequestEvent with the main container\'s first character data', () => {
        const dummyData = {parent:{}, positionX: 10, index:1} as InputCharData
        contextHandler.getMainContainerNoCharData = () => dummyData

        const event = new KeyTypedEvent("Home", true, false);
        eventBus.emit(event)

        expect(eventBus.emit).toHaveBeenCalledWith(new CaretMoveRequestEvent(dummyData));
      });

      it('On "End" key emits a CaretMoveRequestEvent with the main container\'s last character data', () => {
        const dummyData = {parent:{}, positionX: 10, index:1} as InputCharData
        contextHandler.getMainContainerLastCharData = () => dummyData

        const event = new KeyTypedEvent("End", true, false);
        eventBus.emit(event)

        expect(eventBus.emit).toHaveBeenCalledWith(new CaretMoveRequestEvent(dummyData));
      });
    });

  });
});
