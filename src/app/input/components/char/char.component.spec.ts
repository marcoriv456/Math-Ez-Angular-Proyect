import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharComponent } from './char.component';
import {VariableProvider} from "../../models/variable-provider.model";
import {VariableProviderService} from "../../services/variable-provider/variable-provider.service";
import {
  ExperimentalVariableProviderService
} from "../../input-testing-environment/experimental-variable-provider.service";
import {By} from "@angular/platform-browser";
import {configureTestbed} from "../../tests/config/configure-testbed.helper";

describe('CharComponent', () => {
  let component: CharComponent;
  let fixture: ComponentFixture<CharComponent>;
  beforeEach(async () => {
    let { fixtureComponent, testBedFixture}=await configureTestbed(CharComponent)
    fixture=testBedFixture
    component=fixtureComponent
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject variable provider service', () => {
    expect(component.variableProvider).toBeTruthy()
  });
});
