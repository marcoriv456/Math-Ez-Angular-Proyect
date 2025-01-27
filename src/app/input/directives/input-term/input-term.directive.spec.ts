import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTermDirective } from './input-term.directive';
import {Component, DebugElement, inject} from '@angular/core';
import { By } from '@angular/platform-browser';
import {WarningsService} from "../../services/warnings/warnings.service";
import {CharClickedNotifierService} from "../../services/char-clicked-notifier/char-clicked-notifier.service";
import {InputEditableElement} from "../input-editable-element/input-editable-element.directive";
import {TermContainerComponent} from "../../components/term-container/term-container.component";
import {TermValidator} from "../../validation/abstracts/validator.abstract";
import {Subject} from "rxjs";

describe('InputTermDirective', () => {
  let directive: InputTermDirective;
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let debugElement: DebugElement;
  let charClickedNotifierService: jasmine.SpyObj<CharClickedNotifierService>;
  let warningsService: jasmine.SpyObj<WarningsService>;

  @Component({
    template: `
      <div
        [inputTerm]="{
          char: 'x',
          index: 0,
          parent:mockEditable
        }"
      >Test Character</div>
    `
  })
  class TestHostComponent{
    mockEditable= {
      editable: true,
      validator: {} as TermValidator,
      validationRequester: { subscribe: () => {} } as Subject<any>,
      termContainer:{} as TermContainerComponent
    } as unknown as InputEditableElement;
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [InputTermDirective, TestHostComponent],
      providers: [WarningsService,CharClickedNotifierService]
    });

    charClickedNotifierService = TestBed.inject(CharClickedNotifierService)
    charClickedNotifierService.charClicked=jasmine.createSpyObj('EventEmitter', ['emit']);

    warningsService = TestBed.inject(WarningsService)
    warningsService.showWarning=jasmine.createSpyObj('EventEmitter',['emit'])
    warningsService.hideWarning=jasmine.createSpyObj('EventEmitter',['emit'])


    fixture = TestBed.createComponent(TestHostComponent);
    debugElement = fixture.debugElement.query(By.directive(InputTermDirective));
    directive = debugElement.injector.get(InputTermDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('Positioning Methods', () => {
    it('should calculate left position correctly', () => {
      spyOn(directive['ref'], 'getBoundingClientRect').and.returnValue({ left: 100 } as DOMRect);
      expect(directive.leftPosition).toBeDefined();
    });

    it('should get right position', () => {
      expect(directive.rightPosition).toBeDefined();
    });

    it('should get top position', () => {
      expect(directive.topPosition).toBeDefined();
    });
  });

  describe('Click Handling:', () => {
    it('should emit char clicked data on click', () => {
      const mockEvent = new MouseEvent('click', { clientX: 50 });
      spyOn(mockEvent, 'stopPropagation');

      directive['onClick'](mockEvent)

      fixture.detectChanges()

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(charClickedNotifierService.charClicked.emit).toHaveBeenCalled();
    });


    describe('Click positioning: ',()=>{
      beforeEach(()=>{
        Object.defineProperty(directive.ref,'offsetWidth', {value:100})
      })

      it('should return the left position of the character', () => {
        expect(directive['getClickedCharData'](75).positionX).toBe(directive['rightPosition'])
      });

      it('should return the right position of the character', () => {
        expect(directive['getClickedCharData'](25).positionX).toBe(directive['leftPosition'])
      });

      it('should return that the click was in the left side (true)', () => {
        expect(directive['wasClickOnLeftSide'](25)).toBeTrue()
      })

      it('should return that the click was in the right side (false)', () => {
        expect(directive['wasClickOnLeftSide'](75)).toBeFalse()
      })

      it('should call getClickedCharData', () => {
        const mockEvent = new MouseEvent('click', { clientX: 50 });
        spyOn(directive as any,'getClickedCharData')

        directive['onClick'](mockEvent)
        fixture.detectChanges()

        expect(directive['getClickedCharData']).toHaveBeenCalled()
      });

      it('should call wasClickOnLeftSide', () => {
        spyOn(directive as any, 'wasClickOnLeftSide')
        directive['getClickedCharData'](25)

        expect(directive['wasClickOnLeftSide']).toHaveBeenCalled()
      });

    })


  });

  describe('Validation:', () => {

    describe('Validation requests:', () => {
      beforeEach(() => {
        Object.defineProperty(directive, 'validator', {
          get: () => ({
            validate: () => {
              return {isValid: true, messages: []}
            },
            getValidationMessages: () => []
          })
        })
        directive['validationData'] = {
          isValid: false,
          messages: [{message: 'example message', type: 'partially-invalid'}]
        };
      })

      it('should update validation on request', () => {
        spyOn(directive as any, 'setValidationData');

        directive.updateValidation();

        expect(directive['validator']).toBeTruthy()
        expect(directive['setValidationData']).toHaveBeenCalled();
      });

      it('should emit to show the warning on  mouse over', () => {

        directive['onMouseOver']();

        expect(warningsService.showWarning.emit).toHaveBeenCalled();
      });

      it('should emit to hide the warning on mouse leave', () => {
        directive['onMouseLeave']();
        fixture.detectChanges()

        expect(warningsService.hideWarning.emit).toHaveBeenCalled();
      });

    })

    describe('Validation style binding',()=>{
      it('should add the partially invalid class to the host', () => {
        directive.validationData={isValid:false,messages:[],type:'partially-invalid'}

        fixture.detectChanges()

        expect(directive.ref).toHaveClass('partially-invalid')
      });

      it('should add the fully invalid class to the host', () => {
        directive.validationData={isValid:true, messages:[],type:'fully-invalid'}

        fixture.detectChanges()

        expect(directive.ref).toHaveClass('fully-invalid')
      });
    })
  });
});
