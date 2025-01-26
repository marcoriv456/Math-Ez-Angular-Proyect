import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermValidationWarningComponent } from './term-validation-warning.component';
import {configureTestbed} from "../../tests/config/configure-testbed.helper";
import {ElementRef, inject} from "@angular/core";
import {WarningsService} from "../../services/warnings/warnings.service";

describe('TermValidationWarningComponent', () => {
  let component: TermValidationWarningComponent;
  let fixture: ComponentFixture<TermValidationWarningComponent>;
  let warningsService:WarningsService
  beforeEach(async () => {
    await configureTestbed(TermValidationWarningComponent)
    // .compileComponents();

    fixture = TestBed.createComponent(TermValidationWarningComponent);
    component = fixture.componentInstance;
    warningsService=TestBed.inject(WarningsService)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Displaying warnings: ', () => {
    beforeEach(()=>{
      warningsService.showWarning.next({messages:[{message:'warning example',type:'fully-invalid'}],position:{y:200,x:300}})
      fixture.detectChanges()
    })

    it('should display the warning in the dom', () => {

      let expectedElement=document.querySelector('div.warning-container')

      expect(expectedElement).toBeTruthy()
    });

    it('should display the warning messages', () => {
      let expectedElement=document.querySelector('div.warning-container .warning-message')
      expect(expectedElement).toBeTruthy()
    });

    it('should display the warning in the correct position', () => {
      let expectedElement=document.querySelector('.warning-container') as HTMLElement
      let componentHtmlRef=fixture.debugElement.nativeElement as HTMLElement

      const styleLeft=+(expectedElement.style.left.match(/\d+/) as RegExpExecArray)[0]
      const styleTop=+(expectedElement.style.top.match(/\d+/) as RegExpExecArray)[0]

      expect(styleLeft).toBeCloseTo( 300,0)
      expect(styleTop).toBeCloseTo( 200- componentHtmlRef.getBoundingClientRect().top,0)
    });

  });

  describe('Displaying messages: ', () => {
    beforeEach(()=>{
      warningsService.showWarning.next({messages:[{message:'fully invalid warning example',type:'fully-invalid'},{message:'partially invalid warning example',type:'fully-invalid'}],position:{y:200,x:200}})
      fixture.detectChanges()
    })

    it('should display a partially invalid message', () => {
      let expectedElement=document.querySelector('.warning-container .warning-message.partially-invalid')

      expect(expectedElement).toBeTruthy()
    });

    it('should display a fully invalid message', () => {
      let expectedElement=document.querySelector('.warning-container .warning-message.partially-invalid')

      expect(expectedElement).toBeTruthy()
    })

  })
});
