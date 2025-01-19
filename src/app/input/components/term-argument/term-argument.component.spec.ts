import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermArgumentComponent } from './term-argument.component';
import {configureTestbed} from "../../tests/config/configure-testbed.helper";
import {runEditableElementTests} from "../../tests/editable-elements-shared-tests.spec..test";

describe('TermArgumentComponent', () => {
  let component: TermArgumentComponent;
  let fixture: ComponentFixture<TermArgumentComponent>;

  beforeEach(async () => {
    await configureTestbed(TermArgumentComponent)

    fixture = TestBed.createComponent(TermArgumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  runEditableElementTests('TermArgument', TermArgumentComponent)
});
