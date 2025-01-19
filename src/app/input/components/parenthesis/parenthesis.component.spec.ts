import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParenthesisComponent } from './parenthesis.component';
import {configureTestbed} from "../../tests/config/configure-testbed.helper";
import {runEditableElementTests} from "../../tests/editable-elements-shared-tests.spec..test";

describe('ParenthesisComponent', () => {
  let component: ParenthesisComponent;
  let fixture: ComponentFixture<ParenthesisComponent>;

  beforeEach(async () => {
    await configureTestbed(ParenthesisComponent)

    fixture = TestBed.createComponent(ParenthesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  runEditableElementTests('ParenthesisComponent', ParenthesisComponent)
});
