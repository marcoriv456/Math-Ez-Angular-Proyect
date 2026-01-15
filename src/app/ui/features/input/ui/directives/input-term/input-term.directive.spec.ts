import { Component } from '@angular/core';
import { InputEventBusService } from '../../../core/services/input-event-bus/input-event-bus.service';
import { InputTermDirective } from './input-term.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputMathElement } from '../../../core/abstracts/input-math-element.abstract';
import { By } from '@angular/platform-browser';
import { CharClickedEvent } from '../../../core/models/events/io/char-clicked.event';
@Component({
  template: ` <div inputTerm></div> `,
})
class TestHostComponent {}

describe('InputTermDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;
  let directive: InputTermDirective;
  let eventBus: InputEventBusService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent, InputTermDirective],
      providers: [
        { provide: InputMathElement, useValue: null },
        InputEventBusService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    eventBus = TestBed.inject(InputEventBusService);

    const debugEl = fixture.debugElement.query(
      By.directive(InputTermDirective),
    );
    directive = debugEl.injector.get(InputTermDirective);
    element = debugEl.nativeElement as HTMLElement;
    Object.defineProperty(element, 'offsetWidth', {
      get(): any {
        return 150;
      },
      configurable: true,
    });
  });

  it('should emit CharClickedEvent with correct data when clicked on the right side', () => {
    directive.index = 3;
    const mockEvent = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(mockEvent, 'offsetX', { value: 75 });
    const emitSpy = jest.spyOn(eventBus, 'emit');
    jest.spyOn(mockEvent, 'stopPropagation');

    element.dispatchEvent(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(eventBus.emit).toHaveBeenCalledWith(expect.any(CharClickedEvent));
    const emittedEvent: CharClickedEvent = emitSpy.mock.calls.at(
      -1,
    )?.[0] as CharClickedEvent;
    expect(emittedEvent.charData).toEqual({
      positionX: 150,
      index: 3,
      parent: null,
    });
  });

  it('should emit CharClickedEvent with adjusted data when clicked on the left side', () => {
    directive.index = 3;
    const mockEvent = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(mockEvent, 'offsetX', { value: 25 });
    const emitSpy = jest.spyOn(eventBus, 'emit');
    jest.spyOn(mockEvent, 'stopPropagation');

    element.dispatchEvent(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(eventBus.emit).toHaveBeenCalledWith(expect.any(CharClickedEvent));
    const emittedEvent: CharClickedEvent = emitSpy.mock.calls.at(
      -1,
    )?.[0] as CharClickedEvent;
    expect(emittedEvent.charData).toEqual({
      positionX: 0,
      index: 2,
      parent: null,
    });
  });

  it('should calculate leftPosition correctly when parent elements exist', () => {
    const mockParent1 = document.createElement('div');
    const mockParent2 = document.createElement('div');
    const mockAppInput = document.createElement('app-input');

    mockParent2.appendChild(mockParent1);
    mockParent1.appendChild(element);
    mockAppInput.appendChild(mockParent2);

    jest.spyOn(element, 'offsetLeft', 'get').mockReturnValue(50);
    jest.spyOn(mockParent1, 'offsetLeft', 'get').mockReturnValue(30);
    jest.spyOn(mockParent2, 'offsetLeft', 'get').mockReturnValue(20);

    jest.spyOn(element, 'parentElement', 'get').mockReturnValue(mockParent1);
    jest
      .spyOn(mockParent1, 'parentElement', 'get')
      .mockReturnValue(mockParent2);
    jest
      .spyOn(mockParent2, 'parentElement', 'get')
      .mockReturnValue(mockAppInput);
    jest.spyOn(mockAppInput, 'tagName', 'get').mockReturnValue('APP-INPUT');

    const leftPosition = directive.leftPosition;

    expect(leftPosition).toBe(100); // 50 + 30 + 20
  });

  it('should calculate rightPosition correctly', () => {
    jest.spyOn(element, 'offsetLeft', 'get').mockReturnValue(50);
    jest.spyOn(element, 'offsetWidth', 'get').mockReturnValue(100);
    jest.spyOn(element, 'parentElement', 'get').mockReturnValue(null);

    const rightPosition = directive.rightPosition;

    expect(rightPosition).toBe(150);
  });
});
