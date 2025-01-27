import { TestBed } from '@angular/core/testing';

import { VariableProviderService } from './variable-provider.service';
import {VariableProvider} from "../../models/variable-provider.model";
import {
  ExperimentalVariableProviderService
} from "../../input-testing-environment/experimental-variable-provider.service";

describe('VariableProviderService', () => {
  let service: VariableProviderService;
  let variableProvider=new ExperimentalVariableProviderService()
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[VariableProviderService]
    });
    service = TestBed.inject(VariableProviderService);

    service.setVariableProvider(variableProvider)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the wrapped variable provider', () => {
    expect(service.variableProvider).toBeTruthy()
  });

  it('should have some default variables defined', () => {
    expect(service.defaultVariables).toBeTruthy()
  });

  it('should return just the default variable names', () => {
    expect(service.defaultVariableNames).toEqual(['e','π'])
  });

  it('should return all variable names', () => {
    expect(service.variableNames).toEqual(['A','B','C','e','π'])
  });

  it('should return the variable values', () => {
    expect(service.getVariable('A')).toBe(23)
    expect(service.getVariable('B')).toBe(23)
    expect(service.getVariable('C')).toBe(23)
  });

});
