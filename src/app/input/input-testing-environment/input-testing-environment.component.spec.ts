import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTestingEnvironmentComponent } from './input-testing-environment.component';
import {configureTestbed} from "../tests/config/configure-testbed.helper";

describe('InputTestingEnvironmentComponent', () => {
  let component: InputTestingEnvironmentComponent;
  let fixture: ComponentFixture<InputTestingEnvironmentComponent>;

  beforeEach(async () => {
    await configureTestbed(InputTestingEnvironmentComponent)

    fixture = TestBed.createComponent(InputTestingEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an input component instance', () => {
    expect(component.input).toBeTruthy()
  });

  it('should initialize the experimental variable provider', () => {
    expect(component.expVariableProvider).toBeTruthy()
  });
});
