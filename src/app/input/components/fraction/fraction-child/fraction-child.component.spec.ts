import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionChildComponent } from './fraction-child.component';
import {configureTestbed} from "../../../tests/config/configure-testbed.helper";
import {FractionComponent} from "../fraction.component";
import {runEditableElementTests} from "../../../tests/editable-elements-shared-tests.spec..test";

describe('FractionChildComponent', () => {
  let component: FractionChildComponent;
  let fixture: ComponentFixture<FractionChildComponent>;

  beforeEach(async () => {
    let {_fixture,_component}=await configureTestbed(FractionChildComponent)
    component=_component
    fixture=_fixture
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  runEditableElementTests('FractionChildComponent', FractionChildComponent)
});
