import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FractionComponent } from './fraction.component';
import {configureTestbed} from "../../tests/config/configure-testbed.helper";

describe('FractionComponent', () => {
  let component: FractionComponent;
  let fixture: ComponentFixture<FractionComponent>;

  beforeEach(async () => {
    let {_fixture,_component}=await configureTestbed(FractionComponent)
    component=_component
    fixture=_fixture
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the numerator initialized', () => {
    expect(component.numeratorComponent).toBeTruthy()
  })
  it('should have the denominator initialized', () => {
    expect(component.denominatorComponent).toBeTruthy()
  })

  it('should only have 2 children', () => {
    expect(component.renderedChars.length).toBe(2);
  });

});
