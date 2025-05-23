import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaretComponent } from './caret.component';
import {InputModule} from "../../../input.module";
import {InputEventBusService} from "../../../core/services/input-event-bus/input-event-bus.service";
import {CaretMoveRequestEvent} from "../../../core/models/events/caret/caret-move-request.event";
import {TermSection} from "../../../core/models/term-section.model";
import {InputCharData} from "../../../core/models/input-char-data.model";

describe('CaretComponent', () => {
  let component: CaretComponent;
  let fixture: ComponentFixture<CaretComponent>;
  let element: HTMLElement;
  let caret:HTMLElement

  let eventBus:InputEventBusService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element=fixture.nativeElement as HTMLElement
    caret=element.querySelector('.caret-container') as HTMLElement

    eventBus=TestBed.inject(InputEventBusService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it(`On a 'CaretMoveRequest' event it sets the caret's style with the event's data`, () => {
    const data = {positionX:100,parent:{size:20,clientY:200} as TermSection} as InputCharData

    eventBus.emit(new CaretMoveRequestEvent(data))
    fixture.detectChanges();

    expect(caret.style.left).toBe(data.positionX+'px')
    expect(caret.style.height).toBe(data.parent.size+'px')
    expect(caret.style.top).toBe(data.parent.clientY-caret.getBoundingClientRect().top+'px')
  });


});
