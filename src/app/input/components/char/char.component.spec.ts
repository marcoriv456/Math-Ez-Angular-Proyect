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
    let { _component, _fixture}=await configureTestbed(CharComponent)
    fixture=_fixture
    component=_component
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject variable provider service', () => {
    expect(component.variableProvider).toBeTruthy()
  });
});
