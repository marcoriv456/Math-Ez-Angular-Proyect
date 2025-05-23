import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EditableTermContainerComponent} from './editable-term-container.component';
import {InputModule} from "../../../input.module";
import {InputEventBusService} from "../../../core/services/input-event-bus/input-event-bus.service";
import {TermUtils} from "../../../core/utils/term-utils.util";
import {CharClickedEvent} from "../../../core/models/events/io/char-clicked.event";



describe('EditableTermContainerComponent', () => {
  let component: EditableTermContainerComponent;
  let fixture: ComponentFixture<EditableTermContainerComponent>;
  let element: HTMLElement

  let eventBus: InputEventBusService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputModule],
    })
      .compileComponents()


    fixture = TestBed.createComponent(EditableTermContainerComponent);
    component = fixture.componentInstance
    element = fixture.debugElement.nativeElement;
    eventBus = TestBed.inject(InputEventBusService)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`Css class bindings: `, () => {
    describe(`'selected' class: `, () => {
      it(`Adds the selected class to the element if the 'selected' property is set to true.`, () => {
        component.selected = true;
        fixture.detectChanges();

        expect(element.classList).toContain('selected');
      });

      it(`Removes the selected class from the element if the 'selected' property is set to false.`, () => {
        component.selected = false;
        fixture.detectChanges();

        expect(element.classList).not.toContain('selected');
      });
    });

    describe(`'empty' class: `, () => {
      it(`Adds the 'empty' class to the element if the section has no terms.`, () => {
        component.terms = []
        fixture.detectChanges();

        expect(element.classList).toContain('empty');
      });

      it(`Removes the 'empty' class to the element if the section has terms.`, () => {
        component.terms = [{type: 'char', char: 'h'}]
        fixture.detectChanges();

        expect(element.classList).not.toContain('empty');
      });
    });
  });

  describe(`On clicks: `, () => {
    it(`Emits a 'CharClickedEvent' with the last character data it contains:`, () => {
      component.terms = TermUtils.parse("hello")
      fixture.detectChanges()
      const expectedData = component.getLastCharData()
      const mockEvent = new MouseEvent('click', {bubbles: true});
      const emitSpy = jest.spyOn(eventBus, 'emit')
      const propagationSpy = jest.spyOn(mockEvent, 'stopPropagation');

      element.dispatchEvent(mockEvent)

      expect(propagationSpy).toHaveBeenCalled();
      expect(emitSpy).toHaveBeenCalledWith(expect.any(CharClickedEvent));
      const emittedEvent: CharClickedEvent = emitSpy.mock.calls.at(-1)?.[0] as CharClickedEvent
      expect(emittedEvent.charData).toEqual(expectedData);
    });

    it(`If it contains no characters, it emits the data with the position of the right border`, () => {
      component.terms = []
      fixture.detectChanges();
      const expectedData = component.getNoCharData()
      const mockEvent = new MouseEvent('click', {bubbles: true});
      const emitSpy = jest.spyOn(eventBus, 'emit')
      const propagationSpy = jest.spyOn(mockEvent, 'stopPropagation');

      element.dispatchEvent(mockEvent)

      expect(propagationSpy).toHaveBeenCalled();
      expect(emitSpy).toHaveBeenCalledWith(expect.any(CharClickedEvent));
      const emittedEvent: CharClickedEvent = emitSpy.mock.calls.at(-1)?.[0] as CharClickedEvent
      expect(emittedEvent.charData).toEqual(expectedData);
    });
  });

  describe(`Term edition: `, () => {
    it(`Appends terms to its terms array and renders them`, () => {
      component.terms = TermUtils.parse("hello")

      component.append(5, ...TermUtils.parse(" world"));
      fixture.detectChanges()

      expect(component.terms).toEqual(TermUtils.parse("hello world"));
      expect(element.querySelectorAll('char').length).toEqual(11);
    });

    it(`Deletes terms from its terms array and renders the ones that remain`, () => {
      component.terms = TermUtils.parse("hello world")

      component.delete(5, 10)
      fixture.detectChanges()

      expect(component.terms).toEqual(TermUtils.parse("hello"));
      expect(element.querySelectorAll('char').length).toEqual(5);
    });

    it(`Replaces term into its terms array and renders the result`, () => {
      component.terms = TermUtils.parse("hello world")

      component.replace(6, 5, ...TermUtils.parse("everyone"))
      fixture.detectChanges()

      expect(component.terms).toEqual(TermUtils.parse("hello everyone"));
      expect(element.querySelectorAll('char').length).toEqual(14);
    });
  });

  describe(`Emitting changes: `, () => {
    beforeEach(() => {
      component.terms = TermUtils.parse("hello")
      fixture.detectChanges()
    })

    it(`Emits a change when it appends terms: `, () => {
      const subscriber = jest.fn()
      component.addChangesListener(subscriber)

      component.append(5, ...TermUtils.parse(" world"))
      fixture.detectChanges()

      expect(subscriber).toHaveBeenCalled()
    });

    it(`Emits a change when it deletes terms: `, () => {
      const subscriber = jest.fn()
      component.addChangesListener(subscriber)

      component.delete(0, 1)
      fixture.detectChanges()

      expect(subscriber).toHaveBeenCalled()
    });

    it(`Emits a change when it replaces terms: `, () => {
      const subscriber = jest.fn()
      component.addChangesListener(subscriber)

      component.replace(0, 5, ...TermUtils.parse("hi"))
      fixture.detectChanges()

      expect(subscriber).toHaveBeenCalled()
    });

  });

  describe(`Getting characters data: `, () => {
    it(`Returns data which corresponds to the position before the first character, or the first position in casse there isn't any character written already`, () => {
      const charData = component.getNoCharData()

      expect(charData).toEqual({index: -1, positionX: component.positionX, parent: component})
    });

    it(`IF centered it returns data with a centered position respect to the elements width`, () => {
      component.centered = true
      fixture.detectChanges()

      const charData = component.getNoCharData()

      expect(charData).toEqual({index: -1, positionX: component.positionX + element.offsetWidth/2, parent: component})
    });
  });

  describe(`Getting locations: `, () => {

    it(`Returns the correct first character's location: `, () => {
      component.terms = TermUtils.parse("hello")
      fixture.detectChanges()

      const location = component.getTermLocation(0)

      expect(location).toEqual({character: {next:'char', actual:'char'}, container: {isThisMain:true}})
    });

    it(`Returns the correct last character's location: `, () => {
      component.terms = TermUtils.parse("hello")
      fixture.detectChanges()

      const location = component.getTermLocation(4)

      expect(location).toEqual({character: {prev: 'char', actual:'char'}, container: {isThisMain:true}})
    });

    it(`Returns the correct characters's locations for characters that are at the middle: `, () => {
      component.terms = TermUtils.parse("hello")
      fixture.detectChanges()

      const location = component.getTermLocation(2)

      expect(location).toEqual({character: {next:'char', actual:'char', prev:'char'}, container: {isThisMain:true}})
    });
  });

})
;
