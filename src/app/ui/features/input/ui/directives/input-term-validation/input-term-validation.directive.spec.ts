import {Component, forwardRef} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {InputEventBusService} from "../../../core/services/input-event-bus/input-event-bus.service";
import {InputMathElement} from "../../../core/abstracts/input-math-element.abstract";
import {By} from "@angular/platform-browser";
import {TermValidator} from "../../../core/validation/abstracts/validator.abstract";
import {TermValidationMessage} from "../../../core/validation/models/term-validation-message.model";
import {InputTermValidationDirective} from "./input-term-validation.directive";
import {CharComponent} from "../../terms/char/char.component";
import {TermValidationData} from "../../../core/validation/models/term-validation-data.model";
import {validTermValidation} from "../../../core/validation/default-values/valid-term-validation";
import {Subject} from "rxjs";
import {WarningShowRequestEvent} from "../../../core/models/events/warnings/warning-show-request.event";
import {WarningHideRequestEvent} from "../../../core/models/events/warnings/warning-hide-request.event";

class TestValidator extends TermValidator {
  public static validationMessages: TermValidationMessage[] = []
  public static validationData: TermValidationData = validTermValidation

  override getValidationMessages(): TermValidationMessage[] {
    return TestValidator.validationMessages;
  }

  override validate(): TermValidationData {
    return TestValidator.validationData;
  }
}

@Component({
  template: `
    <test [inputTermValidation]="TestValidator"></test>
  `
})
class TestHostComponent {
  TestValidator = TestValidator
}

@Component({
  template: '',
  selector: `test`,
  providers: [{provide: InputMathElement, useExisting: forwardRef(() => TestingMathElement)}]
})
class TestingMathElement extends InputMathElement<any> {
  private static requester = new Subject<void>()
  override validationRequester = TestingMathElement.requester

  public static requestValidation() {
    TestingMathElement.requester.next()
  }
}

describe('InputTermValidationDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;
  let directive: InputTermValidationDirective
  let eventBus: InputEventBusService;
  let hostComponent: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestingMathElement,
        CharComponent,
        TestHostComponent,
        InputTermValidationDirective
      ],
      providers: [
        InputEventBusService
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    fixture.detectChanges()

    eventBus = TestBed.inject(InputEventBusService)

    const debugEl = fixture.debugElement.query(By.directive(InputTermValidationDirective));
    directive = debugEl.injector.get(InputTermValidationDirective);
    element = debugEl.nativeElement as HTMLElement

    hostComponent = fixture.nativeElement as HTMLElement
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe(`Validity class bindings: `, () => {
    it(`Ads no class to the host if it is valid.`, () => {
      TestValidator.validationData = {
        isValid: true,
        messages: []
      }

      TestingMathElement.requestValidation();
      fixture.detectChanges()

      expect(element.classList).not.toContain('partially-invalid');
      expect(element.classList).not.toContain('fully-invalid');
    });

    it(`Adds the 'partially-invalid' class to the host element.`, () => {
      TestValidator.validationData = {isValid: false, type: 'partially-invalid', messages: []}

      TestingMathElement.requestValidation();
      fixture.detectChanges()

      expect(element.classList).toContain('partially-invalid');
    });

    it(`Adds the 'fully-invalid' class to the host element.`, () => {
      TestValidator.validationData = {isValid: false, type: 'fully-invalid', messages: []}

      TestingMathElement.requestValidation();
      fixture.detectChanges()

      expect(element.classList).toContain('fully-invalid');
    });
  });

  describe(`Requesting warnings: `, () => {
    it(`Requests to show a warning if the mouse is over it.`, () => {
      TestValidator.validationData = {isValid: false, type: 'partially-invalid', messages: [{message:'test message', type:'partially-invalid'}]}
      jest.spyOn(eventBus, 'emit')
      const event = new MouseEvent('mouseover', {bubbles: true});

      element.dispatchEvent(event);
      fixture.detectChanges()

      expect(eventBus.emit).toHaveBeenCalledWith(expect.any(WarningShowRequestEvent));
    });

    it(`Requests to show a warning with the correct location data`, () => {
      const expectedMessages:TermValidationMessage[] = [{message:'test message', type:'partially-invalid'}]
      TestValidator.validationData = {isValid: false, type: 'partially-invalid', messages: expectedMessages}
      Object.defineProperty(element, 'getBoundingClientRect', {value: ()=>({left: 100, top: 20})})
      Object.defineProperty(element, 'offsetWidth', {value: 100})
      const emitSpy = jest.spyOn(eventBus, 'emit')
      const event = new MouseEvent('mouseover', {bubbles: true});

      element.dispatchEvent(event);
      fixture.detectChanges()

      const warningEvent = emitSpy.mock.calls[0][0] as WarningShowRequestEvent
      expect(warningEvent.renderData).toEqual({
        messages:expectedMessages,
        position:{x:150,y:20}
      });
    });

    it(`Requests to hide a warning if the mouse leaves it.`, () => {
      TestValidator.validationData = {isValid: false, type: 'partially-invalid', messages: []}
      jest.spyOn(eventBus, 'emit')
      const event = new MouseEvent('mouseleave', {bubbles: true});

      element.dispatchEvent(event);
      fixture.detectChanges()

      expect(eventBus.emit).toHaveBeenCalledWith(expect.any(WarningHideRequestEvent));
    });

  });

});
